"""Admin analytics traffic events

Revision ID: 002
Revises: 001
Create Date: 2026-08-09
"""
from typing import Sequence, Union

import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID
from alembic import op

revision: str = "002"
down_revision: Union[str, None] = "001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "traffic_events",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("event_type", sa.String(64), nullable=False),
        sa.Column("session_id", sa.String(128), nullable=True),
        sa.Column("page_url", sa.Text, nullable=True),
        sa.Column("referrer", sa.Text, nullable=True),
        sa.Column("product_slug", sa.String(128), nullable=True),
        sa.Column("utm_source", sa.Text, nullable=True),
        sa.Column("utm_medium", sa.Text, nullable=True),
        sa.Column("utm_campaign", sa.Text, nullable=True),
        sa.Column("utm_content", sa.Text, nullable=True),
        sa.Column("utm_term", sa.Text, nullable=True),
        sa.Column("fbclid", sa.Text, nullable=True),
        sa.Column("ttclid", sa.Text, nullable=True),
        sa.Column("sc_click_id", sa.Text, nullable=True),
        sa.Column("client_ip", sa.String(64), nullable=True),
        sa.Column("user_agent", sa.Text, nullable=True),
        sa.Column("country_code", sa.String(8), nullable=True),
        sa.Column("risk_provider", sa.String(32), nullable=True),
        sa.Column("is_vpn", sa.Boolean, nullable=False, server_default=sa.false()),
        sa.Column("is_proxy", sa.Boolean, nullable=False, server_default=sa.false()),
        sa.Column("is_tor", sa.Boolean, nullable=False, server_default=sa.false()),
        sa.Column("is_hosting", sa.Boolean, nullable=False, server_default=sa.false()),
        sa.Column("is_valid_traffic", sa.Boolean, nullable=False, server_default=sa.false()),
        sa.Column("blocked_reason", sa.Text, nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("NOW()"),
        ),
    )
    op.create_index("ix_traffic_events_created_at", "traffic_events", ["created_at"])
    op.create_index(
        "ix_traffic_events_valid_created_at",
        "traffic_events",
        ["is_valid_traffic", "created_at"],
    )
    op.create_index("ix_traffic_events_event_type", "traffic_events", ["event_type"])
    op.create_index("ix_traffic_events_session_id", "traffic_events", ["session_id"])
    op.create_index("ix_traffic_events_product_slug", "traffic_events", ["product_slug"])


def downgrade() -> None:
    op.drop_table("traffic_events")
