"use client";

const STORAGE_KEY = "ka_attr";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export interface Attribution {
  landingPage?: string;
  referrer?: string;
  fbclid?: string;
  ttclid?: string;
  sc_click_id?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbp?: string;
  fbc?: string;
  ttp?: string;
  scid?: string;
  capturedAt?: number;
}

export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const incoming: Attribution = {
    landingPage: window.location.href,
    referrer: document.referrer || undefined,
    fbclid: params.get("fbclid") ?? undefined,
    ttclid: params.get("ttclid") ?? undefined,
    sc_click_id: params.get("sc_click_id") ?? undefined,
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
    utm_term: params.get("utm_term") ?? undefined,
    capturedAt: Date.now(),
  };

  // Merge — existing click IDs win, new UTMs overwrite
  const existing = loadAttribution();
  const merged: Attribution = {
    ...incoming,
    fbclid: incoming.fbclid ?? existing.fbclid,
    ttclid: incoming.ttclid ?? existing.ttclid,
    sc_click_id: incoming.sc_click_id ?? existing.sc_click_id,
  };

  // Read platform cookies
  merged.fbp = getCookie("_fbp") ?? existing.fbp;
  merged.fbc = getCookie("_fbc") ?? existing.fbc;
  merged.ttp = getCookie("_ttp") ?? existing.ttp;
  merged.scid = getCookie("_scid") ?? existing.scid;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // storage unavailable
  }

  return merged;
}

export function loadAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: Attribution = JSON.parse(raw);
    if (parsed.capturedAt && Date.now() - parsed.capturedAt > TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return {};
    }
    return parsed;
  } catch {
    return {};
  }
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}
