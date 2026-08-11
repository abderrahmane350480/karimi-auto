"use client";

import { useEffect } from "react";
import { initDeferredPixels } from "@/lib/tracking/pixels";
import { captureAttribution } from "@/lib/tracking/attribution";
import { trackPageView } from "@/lib/tracking/events";

export default function TrackingInit() {
  useEffect(() => {
    captureAttribution();
    trackPageView();
    initDeferredPixels();
  }, []);

  return null;
}
