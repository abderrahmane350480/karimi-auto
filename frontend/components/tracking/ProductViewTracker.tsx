"use client";

import { useEffect } from "react";
import { trackViewContent } from "@/lib/tracking/events";
import { generateEventId } from "@/lib/tracking/ids";

interface ProductViewTrackerProps {
  product: {
    slug: string;
    arabicName: string;
    price: number;
  };
}

export default function ProductViewTracker({ product }: ProductViewTrackerProps) {
  useEffect(() => {
    trackViewContent(product, generateEventId());
  }, [product]);

  return null;
}
