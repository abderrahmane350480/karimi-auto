import httpx

from app.core.config import settings
from app.core.logging import get_logger
from app.db.models import Order
from app.services.orders import PRODUCTS

log = get_logger(__name__)


def _phone_to_local(phone_e164: str) -> str:
    """Convert +212XXXXXXXXX to 0XXXXXXXXX local format."""
    if phone_e164.startswith("+212"):
        return "0" + phone_e164[4:]
    return phone_e164


def _format_date(dt) -> str:
    """Format datetime as DD/MM/YYYY."""
    return dt.strftime("%d/%m/%Y")


async def send_order_to_sheet(order: Order) -> str:
    """
    POST the order to the Google Sheet Apps Script webhook.
    Payload matches the sheet columns:
    data | order id | country | name | phone | products | sku | quantiy | totalprice | currency | status
    Returns 'ok', 'failed', or 'skipped'. Never raises.
    """
    url = settings.GOOGLE_SHEET_WEBHOOK_URL
    if not url:
        log.warning("GOOGLE_SHEET_WEBHOOK_URL not configured. Skipping sheet sync.")
        return "skipped"

    products_list = []
    sku_list = []
    qty_list = []

    for item in order.items:
        product_info = PRODUCTS.get(item.product_slug, {})
        products_list.append(item.product_name_ar)
        sku_list.append(product_info.get("sku", item.product_slug))
        qty_list.append(str(item.quantity))

    body = {
        "data": _format_date(order.created_at),
        "order_id": order.order_number,
        "country": "Morocco",
        "name": order.customer_name,
        "phone": _phone_to_local(order.phone_e164),
        "products": "/".join(products_list),
        "sku": "/".join(sku_list),
        "quantiy": "/".join(qty_list),
        "totalprice": order.grand_total_mad,
        "currency": order.currency,
        "status": "",
    }

    try:
        async with httpx.AsyncClient(timeout=15.0, follow_redirects=True) as client:
            resp = await client.post(url, json=body)
        if resp.status_code == 200:
            log.info("sheet_sync_ok order_number=%s", order.order_number)
            return "ok"
        log.error(
            "sheet_sync_failed order_number=%s status=%d body=%s",
            order.order_number,
            resp.status_code,
            resp.text[:200],
        )
        return "failed"
    except Exception as exc:
        log.error(
            "sheet_sync_error order_number=%s error=%s",
            order.order_number,
            str(exc),
        )
        return "failed"
