"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, ChevronUp } from "lucide-react";
import type { Product } from "@/data/products";

interface StickyCTAProps {
  product: Product;
}

export default function StickyCTA({ product }: StickyCTAProps) {
  const [visible, setVisible] = useState(false);

  // Show only when the offer section (#offer-section) has scrolled out of view
  useEffect(() => {
    const hero = document.getElementById("offer-section");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  function scrollToOffer() {
    const el = document.getElementById("offer-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-20 bg-surface border-t border-border shadow-2xl">
      <div className="max-w-content mx-auto px-4 py-3 flex items-center gap-3">
        {/* Product info — hidden on very small screens to save space */}
        <div className="hidden sm:flex flex-col min-w-0 flex-1">
          <p className="font-arabic font-semibold text-ink text-sm leading-tight truncate">
            {product.shortArabicName}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-accent text-xs">★★★★★</span>
            <span className="text-muted font-arabic text-xs">4.8/5</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col flex-shrink-0">
          <span className="font-arabic text-muted text-xs">ابدا من</span>
          <span className="font-latin font-bold text-primary text-lg leading-none">299 MAD</span>
        </div>

        {/* CTA — scrolls back to offer section */}
        <button
          onClick={scrollToOffer}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark active:scale-95 text-white font-arabic font-bold px-5 py-3 rounded-cta transition-all"
        >
          <ShoppingCart className="w-4 h-4 flex-shrink-0" />
          <span>اختار عرضك</span>
          <ChevronUp className="w-4 h-4 flex-shrink-0" />
        </button>
      </div>
    </div>
  );
}
