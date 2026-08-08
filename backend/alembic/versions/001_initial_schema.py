"""Initial schema: orders, order_items, order_events

Revision ID: 001
Revises:
Create Date: 2026-07-30
"""
from typing import Sequence, Union

import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID
from alembic import op

revision: str = "001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "orders",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("order_number", sa.String(64), nullable=False, unique=True),
        sa.Column("status", sa.String(32), nullable=False, server_default="needs_confirmation"),
        sa.Column("customer_name", sa.Text, nullable=False),
        sa.Column("phone_raw", sa.String(32), nullable=False),
        sa.Column("phone_e164", sa.String(20), nullable=False),
        sa.Column("phone_digits", sa.String(20), nullable=False),
        sa.Column("subtotal_mad", sa.Integer, nullable=False),
        sa.Column("upsell_total_mad", sa.Integer, nullable=False, server_default="0"),
        sa.Column("grand_total_mad", sa.Integer, nullable=False),
        sa.Column("currency", sa.String(8), nullable=False, server_default="MAD"),
        sa.Column("landing_page", sa.Text, nullable=True),
        sa.Column("referrer", sa.Text, nullable=True),
        sa.Column("utm_source", sa.Text, nullable=True),
        sa.Column("utm_medium", sa.Text, nullable=True),
        sa.Column("utm_campaign", sa.Text, nullable=True),
        sa.Column("utm_content", sa.Text, nullable=True),
        sa.Column("utm_term", sa.Text, nullable=True),
        sa.Column("fbclid", sa.Text, nullable=True),
        sa.Column("ttclid", sa.Text, nullable=True),
        sa.Column("sc_click_id", sa.Text, nullable=True),
        sa.Column("fbp", sa.Text, nullable=True),
        sa.Column("fbc", sa.Text, nullable=True),
        sa.Column("ttp", sa.Text, nullable=True),
        sa.Column("scid", sa.Text, nullable=True),
        sa.Column("checkout_event_id", sa.Text, nullable=True),
        sa.Column("purchase_event_id", sa.Text, nullable=True),
        sa.Column("sheet_sync_status", sa.String(32), nullable=False, server_default="pending"),
        sa.Column("sheet_sync_error", sa.Text, nullable=True),
        sa.Column("meta_capi_status", sa.String(32), nullable=True),
        sa.Column("tiktok_capi_status", sa.String(32), nullable=True),
        sa.Column("snap_capi_status", sa.String(32), nullable=True),
        sa.Column("user_agent", sa.Text, nullable=True),
        sa.Column("client_ip", sa.String(64), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("NOW()"),
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("NOW()"),
        ),
    )

    op.create_table(
        "order_items",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("order_id", UUID(as_uuid=True), sa.ForeignKey("orders.id"), nullable=False),
        sa.Column("product_slug", sa.String(128), nullable=False),
        sa.Column("product_name_ar", sa.Text, nullable=False),
        sa.Column("internal_name", sa.Text, nullable=False),
        sa.Column("quantity", sa.Integer, nullable=False, server_default="1"),
        sa.Column("bundle_pieces", sa.Integer, nullable=False),
        sa.Column("source", sa.String(32), nullable=False),
        sa.Column("unit_price_mad", sa.Integer, nullable=False),
        sa.Column("line_total_mad", sa.Integer, nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("NOW()"),
        ),
    )

    op.create_table(
        "order_events",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("order_id", UUID(as_uuid=True), sa.ForeignKey("orders.id"), nullable=True),
        sa.Column("event_type", sa.String(64), nullable=False),
        sa.Column("provider", sa.String(32), nullable=True),
        sa.Column("event_id", sa.Text, nullable=True),
        sa.Column("payload", sa.JSON, nullable=True),
        sa.Column("status", sa.String(32), nullable=False),
        sa.Column("error", sa.Text, nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("NOW()"),
        ),
    )

    # Indexes
    op.create_index("ix_orders_order_number", "orders", ["order_number"])
    op.create_index("ix_orders_phone_e164", "orders", ["phone_e164"])
    op.create_index("ix_orders_status", "orders", ["status"])
    op.create_index("ix_orders_created_at", "orders", ["created_at"])
    op.create_index("ix_orders_purchase_event_id", "orders", ["purchase_event_id"])
    op.create_index("ix_order_items_order_id", "order_items", ["order_id"])
    op.create_index("ix_order_events_order_id", "order_events", ["order_id"])
    op.create_index(
        "ix_order_events_provider_event_id", "order_events", ["provider", "event_id"]
    )


def downgrade() -> None:
    op.drop_table("order_events")
    op.drop_table("order_items")
    op.drop_table("orders")
