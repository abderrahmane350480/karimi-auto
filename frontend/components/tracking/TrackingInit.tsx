"use client";

import { useEffect } from "react";
import { initDeferredPixels } from "@/lib/tracking/pixels";
import { captureAttribution } from "@/lib/tracking/attribution";

export default function TrackingInit() {
  useEffect(() => {
    captureAttribution();
    initDeferredPixels();
  }, []);

  return null;
}
