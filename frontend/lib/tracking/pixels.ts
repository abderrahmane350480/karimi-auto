"use client";

let _loaded = false;
const _queue: (() => void)[] = [];

function flushQueue() {
  _queue.splice(0).forEach((fn) => fn());
}

type AnyFn = (...args: unknown[]) => void;

export function loadPixels() {
  if (_loaded || typeof window === "undefined") return;
  _loaded = true;

  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const tiktokPixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
  const snapPixelId = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID;

  // Meta Pixel
  if (metaPixelId) {
    (function (f: Window & typeof globalThis, b: Document, e: string) {
      const n = f as unknown as Record<string, unknown>;
      if (n.fbq) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fbq = function (...args: unknown[]) {
        const q = fbq as any;
        q.callMethod ? q.callMethod(...args) : q.queue.push(args);
      } as any;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = [];
      n.fbq = fbq as unknown;
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = "https://connect.facebook.net/en_US/fbevents.js";
      const s = b.getElementsByTagName(e)[0];
      s?.parentNode?.insertBefore(t, s);
    })(window, document, "script");

    const w = window as unknown as { fbq?: AnyFn };
    w.fbq?.("init", metaPixelId);
    w.fbq?.("track", "PageView");
  }

  // TikTok Pixel
  if (tiktokPixelId) {
    (function (w: Window & typeof globalThis, d: Document, t: string) {
      const n = w as unknown as Record<string, unknown>;
      if (n.ttq) return;
      const s = (n.ttq = {} as Record<string, unknown>);
      s._i = {};
      s.load = function (e: string) {
        const i = d.createElement("script") as HTMLScriptElement;
        i.async = true;
        i.src = `https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${e}&lib=ttq`;
        const f = d.getElementsByTagName(t)[0];
        f?.parentNode?.insertBefore(i, f);
        (s._i as Record<string, unknown[]>)[e] = [];
        (s as Record<string, unknown>)[e] = (s._i as Record<string, unknown[]>)[e];
      };
      (s.load as (e: string) => void)(tiktokPixelId);
      (n.ttq as { track?: (e: string) => void }).track?.("PageView");
    })(window, document, "script");
  }

  // Snapchat Pixel
  if (snapPixelId) {
    (function (e: Window & typeof globalThis, t: string, n: string) {
      const d = e as unknown as Record<string, unknown>;
      if (d.snaptr) return;
      const a = (d.snaptr = function (...args: unknown[]) {
        const q = a as unknown as { handleRequest?: AnyFn; queue: unknown[] };
        q.handleRequest ? q.handleRequest(...args) : q.queue.push(args);
      }) as unknown as Record<string, unknown>;
      a.queue = [];
      const s = document.createElement(t) as HTMLScriptElement;
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://sc-static.net/scevent.min.js";
      const r = document.getElementsByTagName(t)[0];
      r?.parentNode?.insertBefore(s, r);
      type SnaptrFn = (a: string, b: string, c?: Record<string, string>) => void;
      (e as unknown as { snaptr: SnaptrFn }).snaptr("init", snapPixelId);
      (e as unknown as { snaptr: SnaptrFn }).snaptr("track", "PAGE_VIEW");
    })(window, "script", snapPixelId);
  }

  flushQueue();
}

export function onPixelsReady(fn: () => void) {
  if (_loaded) {
    fn();
  } else {
    _queue.push(fn);
  }
}

export function initDeferredPixels() {
  if (typeof window === "undefined") return;
  if ("requestIdleCallback" in window) {
    (window as unknown as { requestIdleCallback: (fn: () => void) => void }).requestIdleCallback(() => loadPixels());
  } else {
    setTimeout(loadPixels, 2000);
  }
}
