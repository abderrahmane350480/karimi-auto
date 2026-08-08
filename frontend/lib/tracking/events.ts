"use client";

import { onPixelsReady } from "./pixels";

// Platform-specific event name map
const EVENT_MAP = {
  PageView:         { meta: "PageView",         tiktok: "PageView",        snap: "PAGE_VIEW"     },
  ViewContent:      { meta: "ViewContent",      tiktok: "ViewContent",     snap: "VIEW_CONTENT"  },
  AddToCart:        { meta: "AddToCart",        tiktok: "AddToCart",       snap: "ADD_CART"      },
  InitiateCheckout: { meta: "InitiateCheckout", tiktok: "InitiateCheckout",snap: "START_CHECKOUT"},
  Purchase:         { meta: "Purchase",         tiktok: "CompletePayment", snap: "PURCHASE"      },
} as const;

type EventName = keyof typeof EVENT_MAP;

interface EventData {
  eventId?: string;
  value?: number;
  currency?: string;
  contentIds?: string[];
  contentName?: string;
  orderId?: string;
}

function fbq(...args: unknown[]) {
  const w = window as unknown as { fbq?: (...a: unknown[]) => void };
  w.fbq?.(...args);
}

function ttq(event: string, data: Record<string, unknown>, eventId?: string) {
  const w = window as unknown as { ttq?: { track: (e: string, d: Record<string, unknown>, o?: Record<string, unknown>) => void } };
  if (eventId) {
    w.ttq?.track(event, data, { event_id: eventId });
  } else {
    w.ttq?.track(event, data);
  }
}

function snaptr(event: string, data: Record<string, unknown>, dedupId?: string) {
  const w = window as unknown as { snaptr?: (a: string, b: string, c: Record<string, unknown>) => void };
  w.snaptr?.("track", event, {
    ...data,
    ...(dedupId ? { client_dedup_id: dedupId } : {}),
  });
}

export function trackPageView() {
  onPixelsReady(() => {
    fbq("track", "PageView");
    ttq("PageView", {});
    snaptr("PAGE_VIEW", {});
  });
}

export function trackViewContent(product: { slug: string; arabicName: string; price: number }, eventId: string) {
  onPixelsReady(() => {
    fbq("track", "ViewContent", { content_ids: [product.slug], content_name: product.arabicName, value: product.price, currency: "MAD" }, { eventID: eventId });
    ttq("ViewContent", { content_id: product.slug, content_name: product.arabicName, value: product.price, currency: "MAD" }, eventId);
    snaptr("VIEW_CONTENT", { item_ids: [product.slug], price: product.price, currency: "MAD" }, eventId);
  });
}

export function trackAddToCart(item: { slug: string; price: number; quantity: number }, eventId: string) {
  onPixelsReady(() => {
    fbq("track", "AddToCart", { content_ids: [item.slug], value: item.price, currency: "MAD" }, { eventID: eventId });
    ttq("AddToCart", { content_id: item.slug, value: item.price, currency: "MAD", quantity: item.quantity }, eventId);
    snaptr("ADD_CART", { item_ids: [item.slug], price: item.price, currency: "MAD" }, eventId);
  });
}

export function trackInitiateCheckout(value: number, eventId: string) {
  onPixelsReady(() => {
    fbq("track", "InitiateCheckout", { value, currency: "MAD" }, { eventID: eventId });
    ttq("InitiateCheckout", { value, currency: "MAD" }, eventId);
    snaptr("START_CHECKOUT", { price: value, currency: "MAD" }, eventId);
  });
}

export function trackPurchase(order: { orderId: string; orderNumber: string; total: number; slugs: string[]; purchaseEventId: string }) {
  onPixelsReady(() => {
    fbq("track", "Purchase", {
      content_ids: order.slugs,
      value: order.total,
      currency: "MAD",
      order_id: order.orderNumber,
    }, { eventID: order.purchaseEventId });

    ttq("CompletePayment", {
      content_id: order.slugs[0],
      value: order.total,
      currency: "MAD",
      order_id: order.orderNumber,
    }, order.purchaseEventId);

    snaptr("PURCHASE", {
      item_ids: order.slugs,
      price: order.total,
      currency: "MAD",
      transaction_id: order.orderNumber,
    }, order.purchaseEventId);
  });
}

export function trackUpsellView() {
  onPixelsReady(() => {
    fbq("trackCustom", "UpsellView");
  });
}

export function trackUpsellAccept(value: number) {
  onPixelsReady(() => {
    fbq("trackCustom", "UpsellAccept", { value, currency: "MAD" });
  });
}
