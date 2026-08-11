CREATE TABLE IF NOT EXISTS traffic_events (
    id UUID PRIMARY KEY,
    event_type VARCHAR(64) NOT NULL,
    session_id VARCHAR(128),
    page_url TEXT,
    referrer TEXT,
    product_slug VARCHAR(128),
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    fbclid TEXT,
    ttclid TEXT,
    sc_click_id TEXT,
    client_ip VARCHAR(64),
    user_agent TEXT,
    country_code VARCHAR(8),
    risk_provider VARCHAR(32),
    is_vpn BOOLEAN NOT NULL DEFAULT FALSE,
    is_proxy BOOLEAN NOT NULL DEFAULT FALSE,
    is_tor BOOLEAN NOT NULL DEFAULT FALSE,
    is_hosting BOOLEAN NOT NULL DEFAULT FALSE,
    is_valid_traffic BOOLEAN NOT NULL DEFAULT FALSE,
    blocked_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ix_traffic_events_created_at
    ON traffic_events (created_at);

CREATE INDEX IF NOT EXISTS ix_traffic_events_valid_created_at
    ON traffic_events (is_valid_traffic, created_at);

CREATE INDEX IF NOT EXISTS ix_traffic_events_event_type
    ON traffic_events (event_type);

CREATE INDEX IF NOT EXISTS ix_traffic_events_session_id
    ON traffic_events (session_id);

CREATE INDEX IF NOT EXISTS ix_traffic_events_product_slug
    ON traffic_events (product_slug);
