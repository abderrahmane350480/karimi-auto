"use client";

import { loadAttribution } from "./attribution";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const SESSION_KEY = "ka_admin_session_id";

type TrafficEventName =
  | "page_view"
  | "view_content"
  | "add_to_cart"
  | "initiate_checkout";

interface TrafficEventInput {
  eventType: TrafficEventName;
  productSlug?: string;
}

function sessionId() {
  if (typeof window === "undefined") return undefined;
  try {
    const existing = localStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const created = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, created);
    return created;
  } catch {
    return undefined;
  }
}

export function recordTrafficEvent(input: TrafficEventInput) {
  if (typeof window === "undefined") return;
  if (window.location.pathname.startsWith("/admin")) return;

  const attr = loadAttribution();
  const payload = {
    eventType: input.eventType,
    sessionId: sessionId(),
    pageUrl: window.location.href,
    referrer: document.referrer || attr.referrer,
    productSlug: input.productSlug,
    utm_source: attr.utm_source,
    utm_medium: attr.utm_medium,
    utm_campaign: attr.utm_campaign,
    utm_content: attr.utm_content,
    utm_term: attr.utm_term,
    fbclid: attr.fbclid,
    ttclid: attr.ttclid,
    sc_click_id: attr.sc_click_id,
  };

  fetch(`${API_BASE}/api/events/traffic`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // Analytics should never interrupt the customer journey.
  });
}
