from typing import Literal, Optional
from pydantic import BaseModel, Field, field_validator


VALID_SLUGS = {
    "umbrella-sunshade-titanium",
    "nano-ceramic-coating-spray",
    "gps-tracker-4g-anti-theft",
}

VALID_SOURCES = {"product_page", "cart_cross_sell", "upsell", "cross_sell_addon"}


class CartItemIn(BaseModel):
    slug: str
    bundlePieces: int = Field(ge=1, le=3)
    quantity: int = Field(default=1, ge=1, le=10)
    source: str

    @field_validator("slug")
    @classmethod
    def slug_valid(cls, v: str) -> str:
        if v not in VALID_SLUGS:
            raise ValueError(f"Unknown product slug: {v!r}")
        return v

    @field_validator("source")
    @classmethod
    def source_valid(cls, v: str) -> str:
        if v not in VALID_SOURCES:
            raise ValueError(f"Unknown source: {v!r}")
        return v

    @field_validator("bundlePieces")
    @classmethod
    def pieces_valid(cls, v: int) -> int:
        if v not in (1, 2, 3):
            raise ValueError("bundlePieces must be 1, 2, or 3")
        return v


class CustomerIn(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    phoneRaw: str
    phoneE164: str


class AttributionIn(BaseModel):
    landingPage: Optional[str] = None
    referrer: Optional[str] = None
    fbclid: Optional[str] = None
    ttclid: Optional[str] = None
    sc_click_id: Optional[str] = None
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    utm_content: Optional[str] = None
    utm_term: Optional[str] = None


class TrackingIn(BaseModel):
    checkoutEventId: Optional[str] = None
    purchaseEventId: str
    fbp: Optional[str] = None
    fbc: Optional[str] = None
    ttp: Optional[str] = None
    scid: Optional[str] = None


class TotalsIn(BaseModel):
    subtotal: int
    upsellTotal: int = 0
    grandTotal: int
    currency: Literal["MAD"] = "MAD"


class CreateOrderRequest(BaseModel):
    customer: CustomerIn
    cart: list[CartItemIn] = Field(min_length=1)
    totals: TotalsIn
    attribution: Optional[AttributionIn] = None
    tracking: TrackingIn


class OrderItemOut(BaseModel):
    slug: str
    nameAr: str
    bundlePieces: int
    source: str
    unitPriceMad: int
    lineTotalMad: int

    model_config = {"from_attributes": True}


class CreateOrderResponse(BaseModel):
    orderId: str
    orderNumber: str
    status: str
    grandTotalMad: int
    currency: str = "MAD"
    items: list[OrderItemOut]
