from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import TrafficEvent
from app.db.session import get_db
from app.schemas.analytics import TrafficEventRequest, TrafficEventResponse
from app.services import maxmind

router = APIRouter()


def _client_ip(request: Request) -> str | None:
    forwarded = request.headers.get("X-Forwarded-For", "").split(",")[0].strip()
    return forwarded or (request.client.host if request.client else None)


@router.post(
    "/events/traffic",
    response_model=TrafficEventResponse,
    status_code=status.HTTP_202_ACCEPTED,
)
async def record_traffic_event(
    request: Request,
    payload: TrafficEventRequest,
    db: AsyncSession = Depends(get_db),
):
    client_ip = _client_ip(request)
    risk = await maxmind.evaluate_ip(client_ip) if client_ip else None

    event = TrafficEvent(
        event_type=payload.eventType,
        session_id=payload.sessionId,
        page_url=payload.pageUrl,
        referrer=payload.referrer,
        product_slug=payload.productSlug,
        utm_source=payload.utm_source,
        utm_medium=payload.utm_medium,
        utm_campaign=payload.utm_campaign,
        utm_content=payload.utm_content,
        utm_term=payload.utm_term,
        fbclid=payload.fbclid,
        ttclid=payload.ttclid,
        sc_click_id=payload.sc_click_id,
        client_ip=client_ip,
        user_agent=request.headers.get("User-Agent"),
        country_code=risk.country_code if risk else None,
        risk_provider=risk.provider if risk else None,
        is_vpn=risk.is_vpn if risk else False,
        is_proxy=risk.is_proxy if risk else False,
        is_tor=risk.is_tor if risk else False,
        is_hosting=risk.is_hosting if risk else False,
        is_valid_traffic=risk.is_valid if risk else False,
        blocked_reason=risk.reason if risk else "missing_ip",
    )
    db.add(event)
    await db.commit()
    return TrafficEventResponse()
