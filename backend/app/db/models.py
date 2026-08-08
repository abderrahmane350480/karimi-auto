import uuid
from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import DateTime, ForeignKey, Integer, JSON, String, Text
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[uuid.UUID] = mapped_column(
        PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    order_number: Mapped[str] = mapped_column(String(64), unique=True, nullable=False)
    status: Mapped[str] = mapped_column(
        String(32), nullable=False, default="needs_confirmation"
    )
    customer_name: Mapped[str] = mapped_column(Text, nullable=False)
    phone_raw: Mapped[str] = mapped_column(String(32), nullable=False)
    phone_e164: Mapped[str] = mapped_column(String(20), nullable=False)
    phone_digits: Mapped[str] = mapped_column(String(20), nullable=False)
    subtotal_mad: Mapped[int] = mapped_column(Integer, nullable=False)
    upsell_total_mad: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    grand_total_mad: Mapped[int] = mapped_column(Integer, nullable=False)
    currency: Mapped[str] = mapped_column(String(8), nullable=False, default="MAD")
    landing_page: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    referrer: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    utm_source: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    utm_medium: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    utm_campaign: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    utm_content: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    utm_term: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    fbclid: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    ttclid: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    sc_click_id: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    fbp: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    fbc: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    ttp: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    scid: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    checkout_event_id: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    purchase_event_id: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    sheet_sync_status: Mapped[str] = mapped_column(
        String(32), nullable=False, default="pending"
    )
    sheet_sync_error: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    meta_capi_status: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)
    tiktok_capi_status: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)
    snap_capi_status: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)
    user_agent: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    client_ip: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_utcnow
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_utcnow, onupdate=_utcnow
    )

    items: Mapped[list["OrderItem"]] = relationship(
        "OrderItem", back_populates="order", cascade="all, delete-orphan"
    )
    events: Mapped[list["OrderEvent"]] = relationship(
        "OrderEvent", back_populates="order", cascade="all, delete-orphan"
    )


class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[uuid.UUID] = mapped_column(
        PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    order_id: Mapped[uuid.UUID] = mapped_column(
        PG_UUID(as_uuid=True), ForeignKey("orders.id"), nullable=False
    )
    product_slug: Mapped[str] = mapped_column(String(128), nullable=False)
    product_name_ar: Mapped[str] = mapped_column(Text, nullable=False)
    internal_name: Mapped[str] = mapped_column(Text, nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    bundle_pieces: Mapped[int] = mapped_column(Integer, nullable=False)
    source: Mapped[str] = mapped_column(String(32), nullable=False)
    unit_price_mad: Mapped[int] = mapped_column(Integer, nullable=False)
    line_total_mad: Mapped[int] = mapped_column(Integer, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_utcnow
    )

    order: Mapped["Order"] = relationship("Order", back_populates="items")


class OrderEvent(Base):
    __tablename__ = "order_events"

    id: Mapped[uuid.UUID] = mapped_column(
        PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    order_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        PG_UUID(as_uuid=True), ForeignKey("orders.id"), nullable=True
    )
    event_type: Mapped[str] = mapped_column(String(64), nullable=False)
    provider: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)
    event_id: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    payload: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    status: Mapped[str] = mapped_column(String(32), nullable=False)
    error: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_utcnow
    )

    order: Mapped[Optional["Order"]] = relationship("Order", back_populates="events")
