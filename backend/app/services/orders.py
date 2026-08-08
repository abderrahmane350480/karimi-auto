import uuid
from datetime import datetime, timezone

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.logging import get_logger
from app.db.models import Order, OrderItem
from app.schemas.orders import CartItemIn, CreateOrderRequest, CreateOrderResponse, OrderItemOut
from app.services.phone import normalize_moroccan_phone

log = get_logger(__name__)

# Canonical product catalog
PRODUCTS: dict[str, dict] = {
    "umbrella-sunshade-titanium": {
        "name_ar": "واقي الشمس المظلة",
        "internal_name": "TitanShield Umbrella Sunshade",
        "sku": "KA-SUN-001",
    },
    "nano-ceramic-coating-spray": {
        "name_ar": "سبراي السيراميك نانو",
        "internal_name": "CeraShield Nano Ceramic Spray",
        "sku": "KA-CER-002",
    },
    "gps-tracker-4g-anti-theft": {
        "name_ar": "جهاز GPS ضد السرقة 4G",
        "internal_name": "GuardLink 4G GPS Tracker",
        "sku": "KA-GPS-003",
    },
}

BUNDLE_PRICES: dict[int, int] = {1: 299, 2: 379, 3: 449}
UPSELL_PRICE = 199
# Cross-sell bundle add-on pricing: bundlePieces=1 → 150 MAD, bundlePieces=2 → 200 MAD
CROSS_SELL_ADDON_PRICES: dict[int, int] = {1: 150, 2: 200}


def _canonical_price(bundle_pieces: int, source: str) -> int:
    if source == "upsell":
        return UPSELL_PRICE
    if source == "cross_sell_addon":
        return CROSS_SELL_ADDON_PRICES.get(bundle_pieces, 150)
    return BUNDLE_PRICES.get(bundle_pieces, 299)


def _recalculate_totals(items: list[CartItemIn]) -> tuple[int, int, int]:
    subtotal = 0
    upsell_total = 0
    for item in items:
        price = _canonical_price(item.bundlePieces, item.source)
        line = price * item.quantity
        if item.source == "upsell":
            upsell_total += line
        else:
            subtotal += line
    return subtotal, upsell_total, subtotal + upsell_total


async def _generate_order_number(db: AsyncSession) -> str:
    today = datetime.now(timezone.utc).strftime("%Y%m%d")
    prefix = f"{settings.ORDER_NUMBER_PREFIX}-{today}-"
    result = await db.execute(
        select(func.count()).where(Order.order_number.like(f"{prefix}%"))
    )
    count = result.scalar_one() + 1
    return f"{prefix}{count:06d}"


async def create_order(
    db: AsyncSession,
    payload: CreateOrderRequest,
    client_ip: str | None,
    user_agent: str | None,
) -> CreateOrderResponse:
    # Server-side phone normalization — overrides any client value
    try:
        phone_raw, phone_e164, phone_digits = normalize_moroccan_phone(
            payload.customer.phoneRaw
        )
    except ValueError as exc:
        raise ValueError(str(exc)) from exc

    # Server-side total recalculation — never trust client totals
    subtotal, upsell_total, grand_total = _recalculate_totals(payload.cart)

    order_number = await _generate_order_number(db)

    attr = payload.attribution or {}

    order = Order(
        order_number=order_number,
        status="needs_confirmation",
        customer_name=payload.customer.name.strip(),
        phone_raw=phone_raw,
        phone_e164=phone_e164,
        phone_digits=phone_digits,
        subtotal_mad=subtotal,
        upsell_total_mad=upsell_total,
        grand_total_mad=grand_total,
        currency="MAD",
        landing_page=getattr(attr, "landingPage", None),
        referrer=getattr(attr, "referrer", None),
        utm_source=getattr(attr, "utm_source", None),
        utm_medium=getattr(attr, "utm_medium", None),
        utm_campaign=getattr(attr, "utm_campaign", None),
        utm_content=getattr(attr, "utm_content", None),
        utm_term=getattr(attr, "utm_term", None),
        fbclid=getattr(attr, "fbclid", None),
        ttclid=getattr(attr, "ttclid", None),
        sc_click_id=getattr(attr, "sc_click_id", None),
        fbp=payload.tracking.fbp,
        fbc=payload.tracking.fbc,
        ttp=payload.tracking.ttp,
        scid=payload.tracking.scid,
        checkout_event_id=payload.tracking.checkoutEventId,
        purchase_event_id=payload.tracking.purchaseEventId,
        user_agent=user_agent,
        client_ip=client_ip,
    )

    db_items: list[OrderItem] = []
    for item in payload.cart:
        product = PRODUCTS[item.slug]
        price = _canonical_price(item.bundlePieces, item.source)
        line_total = price * item.quantity
        db_item = OrderItem(
            product_slug=item.slug,
            product_name_ar=product["name_ar"],
            internal_name=product["internal_name"],
            quantity=item.quantity,
            bundle_pieces=item.bundlePieces,
            source=item.source,
            unit_price_mad=price,
            line_total_mad=line_total,
        )
        db_items.append(db_item)

    order.items = db_items
    db.add(order)
    await db.commit()
    await db.refresh(order)

    log.info(
        "order_created order_id=%s order_number=%s grand_total=%d",
        order.id,
        order.order_number,
        order.grand_total_mad,
    )

    items_out = [
        OrderItemOut(
            slug=i.product_slug,
            nameAr=i.product_name_ar,
            bundlePieces=i.bundle_pieces,
            source=i.source,
            unitPriceMad=i.unit_price_mad,
            lineTotalMad=i.line_total_mad,
        )
        for i in db_items
    ]

    return CreateOrderResponse(
        orderId=str(order.id),
        orderNumber=order.order_number,
        status=order.status,
        grandTotalMad=order.grand_total_mad,
        currency="MAD",
        items=items_out,
    )
