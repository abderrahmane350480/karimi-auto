from datetime import datetime, timezone

import httpx

from app.core.config import settings
from app.core.logging import get_logger
from app.db.models import Order
from app.services.hashing import hash_phone_tiktok

log = get_logger(__name__)

SITE_URL = "https://karimiauto.site"
TIKTOK_EVENTS_URL = "https://business-api.tiktok.com/open_api/v1.3/event/track/"


async def send_purchase_event(order: Order) -> str:
    """Send CompletePayment event to TikTok Events API. Returns 'ok' or 'failed'."""
    if not settings.TIKTOK_PIXEL_CODE or not settings.TIKTOK_ACCESS_TOKEN:
        log.warning("TikTok Events API not configured. Skipping.")
        return "skipped"

    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    user_data: dict = {}
    if order.phone_e164:
        user_data["phone_number"] = hash_phone_tiktok(order.phone_e164)
    if order.ttp:
        user_data["ttp"] = order.ttp
    if order.ttclid:
        user_data["ttclid"] = order.ttclid

    contents = [
        {
            "content_id": item.product_slug,
            "quantity": item.quantity,
            "price": item.unit_price_mad,
        }
        for item in order.items
    ]

    payload = {
        "pixel_code": settings.TIKTOK_PIXEL_CODE,
        "event": "CompletePayment",
        "event_id": order.purchase_event_id or str(order.id),
        "timestamp": timestamp,
        "context": {
            "page": {"url": f"{SITE_URL}/thank-you"},
            "user": user_data,
            "ip": order.client_ip or "",
            "user_agent": order.user_agent or "",
        },
        "properties": {
            "currency": "MAD",
            "value": order.grand_total_mad,
            "contents": contents,
            "order_id": order.order_number,
        },
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(
                TIKTOK_EVENTS_URL,
                json={"data": [payload]},
                headers={"Access-Token": settings.TIKTOK_ACCESS_TOKEN},
            )
        data = resp.json()
        if resp.status_code == 200 and data.get("code") == 0:
            log.info("tiktok_capi_ok order_number=%s", order.order_number)
            return "ok"
        log.error(
            "tiktok_capi_failed order_number=%s status=%d body=%s",
            order.order_number,
            resp.status_code,
            str(data)[:300],
        )
        return "failed"
    except Exception as exc:
        log.error("tiktok_capi_error order_number=%s error=%s", order.order_number, exc)
        return "failed"
