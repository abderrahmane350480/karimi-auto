import time

import httpx

from app.core.config import settings
from app.core.logging import get_logger
from app.db.models import Order
from app.services.hashing import hash_phone_meta

log = get_logger(__name__)

SITE_URL = "https://karimiauto.site"


async def send_purchase_event(order: Order) -> str:
    """Send Purchase event to Meta Conversions API. Returns 'ok' or 'failed'."""
    if not settings.META_PIXEL_ID or not settings.META_ACCESS_TOKEN:
        log.warning("Meta CAPI not configured. Skipping.")
        return "skipped"

    url = (
        f"https://graph.facebook.com/{settings.META_API_VERSION}"
        f"/{settings.META_PIXEL_ID}/events"
    )

    user_data: dict = {
        "client_ip_address": order.client_ip or "",
        "client_user_agent": order.user_agent or "",
    }
    if order.fbp:
        user_data["fbp"] = order.fbp
    if order.fbc:
        user_data["fbc"] = order.fbc
    if order.phone_digits:
        user_data["ph"] = [hash_phone_meta(order.phone_digits)]

    content_ids = [item.product_slug for item in order.items]

    payload = {
        "data": [
            {
                "event_name": "Purchase",
                "event_time": int(time.time()),
                "event_id": order.purchase_event_id or str(order.id),
                "action_source": "website",
                "event_source_url": f"{SITE_URL}/thank-you",
                "user_data": user_data,
                "custom_data": {
                    "currency": "MAD",
                    "value": order.grand_total_mad,
                    "content_ids": content_ids,
                    "content_type": "product",
                    "order_id": order.order_number,
                },
            }
        ]
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(
                url,
                json=payload,
                params={"access_token": settings.META_ACCESS_TOKEN},
            )
        if resp.status_code == 200:
            log.info("meta_capi_ok order_number=%s", order.order_number)
            return "ok"
        log.error(
            "meta_capi_failed order_number=%s status=%d body=%s",
            order.order_number,
            resp.status_code,
            resp.text[:300],
        )
        return "failed"
    except Exception as exc:
        log.error("meta_capi_error order_number=%s error=%s", order.order_number, exc)
        return "failed"
