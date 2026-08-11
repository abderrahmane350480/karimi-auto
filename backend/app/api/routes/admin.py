from datetime import datetime, time, timezone
from secrets import compare_digest
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from sqlalchemy import distinct, func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.config import settings
from app.db.models import Order, OrderItem, TrafficEvent
from app.db.session import get_db

router = APIRouter(prefix="/admin")
security = HTTPBasic()


def _require_admin(
    credentials: Annotated[HTTPBasicCredentials, Depends(security)],
) -> None:
    configured = bool(settings.ADMIN_USERNAME and settings.ADMIN_PASSWORD)
    username_ok = compare_digest(credentials.username, settings.ADMIN_USERNAME)
    password_ok = compare_digest(credentials.password, settings.ADMIN_PASSWORD)
    if not configured or not (username_ok and password_ok):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin credentials",
            headers={"WWW-Authenticate": "Basic"},
        )


def _parse_date(value: str | None, fallback: datetime, end_of_day: bool = False) -> datetime:
    if not value:
        return fallback
    parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    if len(value) == 10:
        parsed = datetime.combine(
            parsed.date(),
            time.max if end_of_day else time.min,
            tzinfo=timezone.utc,
        )
    return parsed.astimezone(timezone.utc)


def _date_range(start: str | None, end: str | None) -> tuple[datetime, datetime]:
    now = datetime.now(timezone.utc)
    start_dt = _parse_date(start, now.replace(hour=0, minute=0, second=0, microsecond=0))
    end_dt = _parse_date(end, now, end_of_day=True)
    return start_dt, end_dt


def _money(value: int | None) -> int:
    return int(value or 0)


@router.get("/dashboard")
async def dashboard(
    _: Annotated[None, Depends(_require_admin)],
    db: AsyncSession = Depends(get_db),
    start: str | None = Query(default=None),
    end: str | None = Query(default=None),
):
    start_dt, end_dt = _date_range(start, end)

    valid_traffic = (
        TrafficEvent.created_at >= start_dt,
        TrafficEvent.created_at <= end_dt,
        TrafficEvent.is_valid_traffic.is_(True),
    )
    order_range = (Order.created_at >= start_dt, Order.created_at <= end_dt)

    traffic_counts = await db.execute(
        select(
            func.count(TrafficEvent.id),
            func.count(distinct(TrafficEvent.session_id)),
            func.count(TrafficEvent.id).filter(TrafficEvent.event_type == "add_to_cart"),
            func.count(TrafficEvent.id).filter(TrafficEvent.event_type == "initiate_checkout"),
        ).where(*valid_traffic)
    )
    clicks, visitors, add_to_cart, checkouts = traffic_counts.one()

    order_counts = await db.execute(
        select(
            func.count(Order.id),
            func.coalesce(func.sum(Order.grand_total_mad), 0),
            func.coalesce(func.avg(Order.grand_total_mad), 0),
        ).where(*order_range)
    )
    orders_count, revenue, aov = order_counts.one()

    daily_traffic_rows = await db.execute(
        select(
            func.date(TrafficEvent.created_at).label("day"),
            func.count(TrafficEvent.id).label("clicks"),
            func.count(distinct(TrafficEvent.session_id)).label("visitors"),
        )
        .where(*valid_traffic)
        .group_by("day")
        .order_by("day")
    )
    daily_order_rows = await db.execute(
        select(
            func.date(Order.created_at).label("day"),
            func.count(Order.id).label("orders"),
            func.coalesce(func.sum(Order.grand_total_mad), 0).label("revenue"),
        )
        .where(*order_range)
        .group_by("day")
        .order_by("day")
    )

    daily: dict[str, dict] = {}
    for day, day_clicks, day_visitors in daily_traffic_rows.all():
        key = day.isoformat()
        daily[key] = {
            "date": key,
            "clicks": int(day_clicks),
            "visitors": int(day_visitors),
            "orders": 0,
            "revenueMad": 0,
        }
    for day, day_orders, day_revenue in daily_order_rows.all():
        key = day.isoformat()
        daily.setdefault(
            key,
            {"date": key, "clicks": 0, "visitors": 0, "orders": 0, "revenueMad": 0},
        )
        daily[key]["orders"] = int(day_orders)
        daily[key]["revenueMad"] = _money(day_revenue)

    source_rows = await db.execute(
        select(
            func.coalesce(TrafficEvent.utm_source, "direct").label("source"),
            func.count(TrafficEvent.id).label("clicks"),
            func.count(distinct(TrafficEvent.session_id)).label("visitors"),
        )
        .where(*valid_traffic)
        .group_by("source")
        .order_by(func.count(TrafficEvent.id).desc())
    )
    sources = [
        {"source": source, "clicks": int(click_count), "visitors": int(visitor_count)}
        for source, click_count, visitor_count in source_rows.all()
    ]

    product_rows = await db.execute(
        select(
            OrderItem.product_slug,
            OrderItem.internal_name,
            func.sum(OrderItem.quantity).label("units"),
            func.count(distinct(Order.id)).label("orders"),
            func.coalesce(func.sum(OrderItem.line_total_mad), 0).label("revenue"),
        )
        .join(Order, Order.id == OrderItem.order_id)
        .where(*order_range)
        .group_by(OrderItem.product_slug, OrderItem.internal_name)
        .order_by(func.coalesce(func.sum(OrderItem.line_total_mad), 0).desc())
    )
    products = [
        {
            "slug": slug,
            "name": name,
            "units": int(units or 0),
            "orders": int(product_orders or 0),
            "revenueMad": _money(product_revenue),
        }
        for slug, name, units, product_orders, product_revenue in product_rows.all()
    ]

    conversion_rate = (int(orders_count or 0) / int(clicks or 0) * 100) if clicks else 0
    checkout_rate = (int(checkouts or 0) / int(clicks or 0) * 100) if clicks else 0

    return {
        "range": {"start": start_dt.isoformat(), "end": end_dt.isoformat()},
        "metrics": {
            "clicks": int(clicks or 0),
            "visitors": int(visitors or 0),
            "addToCart": int(add_to_cart or 0),
            "checkouts": int(checkouts or 0),
            "orders": int(orders_count or 0),
            "revenueMad": _money(revenue),
            "averageOrderValueMad": round(float(aov or 0), 2),
            "conversionRate": round(conversion_rate, 2),
            "checkoutRate": round(checkout_rate, 2),
        },
        "daily": list(daily.values()),
        "sources": sources,
        "products": products,
    }


@router.get("/orders")
async def orders(
    _: Annotated[None, Depends(_require_admin)],
    db: AsyncSession = Depends(get_db),
    start: str | None = Query(default=None),
    end: str | None = Query(default=None),
    status_filter: str | None = Query(default=None, alias="status"),
):
    start_dt, end_dt = _date_range(start, end)
    filters = [Order.created_at >= start_dt, Order.created_at <= end_dt]
    if status_filter:
        filters.append(Order.status == status_filter)

    result = await db.execute(
        select(Order)
        .options(selectinload(Order.items), selectinload(Order.events))
        .where(*filters)
        .order_by(Order.created_at.desc())
        .limit(500)
    )
    rows = result.scalars().all()

    return {
        "orders": [
            {
                "id": str(order.id),
                "orderNumber": order.order_number,
                "status": order.status,
                "customerName": order.customer_name,
                "phoneRaw": order.phone_raw,
                "phoneE164": order.phone_e164,
                "subtotalMad": order.subtotal_mad,
                "upsellTotalMad": order.upsell_total_mad,
                "grandTotalMad": order.grand_total_mad,
                "currency": order.currency,
                "landingPage": order.landing_page,
                "referrer": order.referrer,
                "utmSource": order.utm_source,
                "utmMedium": order.utm_medium,
                "utmCampaign": order.utm_campaign,
                "utmContent": order.utm_content,
                "utmTerm": order.utm_term,
                "fbclid": order.fbclid,
                "ttclid": order.ttclid,
                "scClickId": order.sc_click_id,
                "clientIp": order.client_ip,
                "userAgent": order.user_agent,
                "sheetSyncStatus": order.sheet_sync_status,
                "metaCapiStatus": order.meta_capi_status,
                "tiktokCapiStatus": order.tiktok_capi_status,
                "snapCapiStatus": order.snap_capi_status,
                "createdAt": order.created_at.isoformat(),
                "updatedAt": order.updated_at.isoformat(),
                "items": [
                    {
                        "slug": item.product_slug,
                        "nameAr": item.product_name_ar,
                        "internalName": item.internal_name,
                        "quantity": item.quantity,
                        "bundlePieces": item.bundle_pieces,
                        "source": item.source,
                        "unitPriceMad": item.unit_price_mad,
                        "lineTotalMad": item.line_total_mad,
                    }
                    for item in order.items
                ],
                "events": [
                    {
                        "eventType": event.event_type,
                        "provider": event.provider,
                        "status": event.status,
                        "error": event.error,
                        "createdAt": event.created_at.isoformat(),
                    }
                    for event in sorted(order.events, key=lambda e: e.created_at)
                ],
            }
            for order in rows
        ]
    }
