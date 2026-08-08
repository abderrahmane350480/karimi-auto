import time

import httpx

from app.core.config import settings
from app.core.logging import get_logger
from app.db.models import Order
from app.services.hashing import hash_phone_snap

log = get_logger(__name__)

SITE_URL = "https://karimiauto.site"
SNAP_CAPI_URL = "https://tr.snapchat.com/v3/{pixel_id}/events"


async def send_purchase_event(order: Order) -> str:
    """Send PURCHASE event to Snapchat Conversions API. Returns 'ok' or 'failed'."""
    if not settings.SNAP_PIXEL_ID or not settings.SNAP_ACCESS_TOKEN:
        log.warning("Snap CAPI not configured. Skipping.")
        return "skipped"

    url = SNAP_CAPI_URL.format(pixel_id=settings.SNAP_PIXEL_ID)

    user_data: dict = {
        "client_ip_address": order.client_ip or "",
        "client_user_agent": order.user_agent or "",
    }
    if order.phone_digits:
        user_data["ph"] = [hash_phone_snap(order.phone_digits)]

    contents = [
        {
            "id": item.product_slug,
            "quantity": str(item.quantity),
            "item_price": str(item.unit_price_mad),
            "brand": "Karimi Auto",
        }
        for item in order.items
    ]

    payload = {
        "data": [
            {
                "event_name": "PURCHASE",
                "event_time": int(time.time()),
                "event_source_url": f"{SITE_URL}/thank-you",
                "action_source": "WEB",
                "event_id": order.purchase_event_id or str(order.id),
                "user_data": user_data,
                "custom_data": {
                    "currency": "MAD",
                    "value": order.grand_total_mad,
                    "order_id": order.order_number,
                    "contents": contents,
                },
            }
        ]
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(
                url,
                json=payload,
                headers={"Authorization": f"Bearer {settings.SNAP_ACCESS_TOKEN}"},
            )
        if resp.status_code == 200:
            log.info("snap_capi_ok order_number=%s", order.order_number)
            return "ok"
        log.error(
            "snap_capi_failed order_number=%s status=%d body=%s",
            order.order_number,
            resp.status_code,
            resp.text[:300],
        )
        return "failed"
    except Exception as exc:
        log.error("snap_capi_error order_number=%s error=%s", order.order_number, exc)
        return "failed"
