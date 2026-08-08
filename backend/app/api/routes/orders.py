from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.logging import get_logger
from app.db.models import Order
from app.db.session import get_db
from app.schemas.orders import CreateOrderRequest, CreateOrderResponse
from app.services import orders as order_service
from app.services import google_sheets, capi_meta, capi_tiktok, capi_snap, maxmind

router = APIRouter()
log = get_logger(__name__)


async def _post_order_tasks(order_id: str, db: AsyncSession) -> None:
    result = await db.execute(
        select(Order).options(selectinload(Order.items)).where(Order.id == order_id)
    )
    order = result.scalar_one_or_none()
    if not order:
        return

    sheet_status = await google_sheets.send_order_to_sheet(order)
    meta_status = await capi_meta.send_purchase_event(order)
    tiktok_status = await capi_tiktok.send_purchase_event(order)
    snap_status = await capi_snap.send_purchase_event(order)

    order.sheet_sync_status = sheet_status
    order.meta_capi_status = meta_status
    order.tiktok_capi_status = tiktok_status
    order.snap_capi_status = snap_status
    await db.commit()


@router.post(
    "/orders",
    response_model=CreateOrderResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_order(
    request: Request,
    payload: CreateOrderRequest,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    client_ip = request.headers.get("X-Forwarded-For", "").split(",")[0].strip() or (
        request.client.host if request.client else None
    )
    user_agent = request.headers.get("User-Agent")

    # Whitelist phone number bypasses MaxMind check
    is_whitelisted = payload.customer.phoneE164 == "+21255000000"
    
    if not is_whitelisted and client_ip:
        try:
            await maxmind.check_ip_allowed(client_ip)
        except HTTPException:
            raise
        except Exception as e:
            log.error(f"Unexpected error in MaxMind check: {e}")

    try:
        result = await order_service.create_order(db, payload, client_ip, user_agent)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
    except Exception as exc:
        log.error(f"Unexpected error creating order: {exc}")
        import traceback
        log.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    try:
        # Fire sheet + CAPI in background so user is not blocked
        background_tasks.add_task(_post_order_tasks, result.orderId, db)
    except Exception as exc:
        log.error(f"Unexpected error adding background task: {exc}")
        import traceback
        log.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    return result
