"use client";

import { useState, useRef } from "react";
import type { Product } from "@/data/products";
import { useCartStore } from "@/stores/cart-store";
import { generateEventId } from "@/lib/tracking/ids";
import { trackAddToCart } from "@/lib/tracking/events";
import { ShieldCheck, Truck, PhoneCall } from "lucide-react";

const URGENCY_MESSAGES: Record<string, string> = {
  "umbrella-sunshade-titanium": "⚠️ نحنا فعز الصيف — الحرارة غادي تزيد هاد الأسابيع. احمي طوموبيلتك دابا.",
  "nano-ceramic-coating-spray": "⚠️ الغبار والرمل كيخدشو الطلاء كل يوم كتأخر فيه — كل يوم بلا حماية = خدوش جديدة.",
  "gps-tracker-4g-anti-theft": "⚠️ سرقة الطوموبيلات فالمغرب +12% هاد العام. كل يوم بلا GPS = مخاطرة.",
};

function useSessionStockCount() {
  const ref = useRef<number | null>(null);
  if (ref.current === null) {
    const NON_ROUND = [7, 9, 11, 13, 14, 17, 19, 21, 23];
    ref.current = NON_ROUND[Math.floor(Math.random() * NON_ROUND.length)];
  }
  return ref.current;
}

interface OfferSelectorProps {
  product: Product;
}

export default function OfferSelector({ product }: OfferSelectorProps) {
  const [selectedIdx, setSelectedIdx] = useState(1); // Default: middle tier (most popular)
  const { addItem, openCart } = useCartStore();
  const stockCount = useSessionStockCount();
  const urgencyMsg = URGENCY_MESSAGES[product.slug];

  const selectedBundle = product.crossSellBundles[selectedIdx];

  function handleAddToCart() {
    const eventId = generateEventId();
    
    // Add all items in the bundle to cart
    selectedBundle.items.forEach((item) => {
      addItem({
        productId: item.slug, // using slug as productId for simplicity
        slug: item.slug,
        nameAr: item.nameAr,
        quantity: 1,
        bundlePieces: item.bundlePieces,
        unitOfferPrice: item.price,
        totalPrice: item.price,
        source: item.source,
        addToCartEventId: eventId,
      });
      trackAddToCart(
        { slug: item.slug, price: item.price, quantity: 1 },
        eventId
      );
    });

    openCart();
  }

  return (
    <div className="flex flex-col gap-4 w-full min-w-0">
      {/* Urgency banner */}
      {urgencyMsg && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl px-4 py-3 min-w-0">
          <p className="font-arabic text-amber-800 text-sm leading-relaxed font-semibold whitespace-normal break-words">
            {urgencyMsg}
          </p>
        </div>
      )}

      {/* Stock counter */}
      <div className="flex items-center justify-center gap-2 bg-urgency/10 border border-urgency/30 rounded-xl px-4 py-2.5 min-w-0">
        <span className="w-2 h-2 rounded-full bg-urgency animate-pulse flex-shrink-0" />
        <p className="font-arabic text-urgency text-sm font-bold whitespace-normal break-words">
          باقي فقط {stockCount} قطعة فالمخزون — الطلب عالي هاد الأيام
        </p>
      </div>

      {/* Offer cards — stacked vertically, result-focused */}
      <div className="flex flex-col gap-2 w-full">
        {product.crossSellBundles.map((bundle, idx) => {
          const isSelected = selectedIdx === idx;
          const isPopular = bundle.badge === "الأكثر مبيعاً" || bundle.badge === "الأكثر اختياراً";

          return (
            <button
              key={bundle.id}
              onClick={() => setSelectedIdx(idx)}
              className={`relative w-full max-w-full overflow-hidden text-right transition-all rounded-xl border-2 min-w-0 ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-md"
                  : isPopular
                  ? "border-accent/40 bg-surface hover:border-accent/70"
                  : "border-border bg-surface hover:border-primary/40"
              }`}
              aria-pressed={isSelected}
            >
              {/* Floating badge */}
              {bundle.badge && (
                <span
                  className={`absolute -top-2.5 right-4 text-xs font-arabic font-bold px-2.5 py-0.5 rounded-full ${
                    isPopular
                      ? "bg-accent text-white"
                      : "bg-success text-white"
                  }`}
                >
                  {bundle.badge}
                </span>
              )}

              <div className="flex flex-col items-stretch gap-3 px-3.5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-4">
                {/* Result info */}
                <div className="flex flex-col items-end flex-1 min-w-0 max-w-full gap-0.5">
                  <span className={`w-full whitespace-normal break-words font-arabic font-bold text-base leading-tight ${isSelected ? "text-primary" : "text-ink"}`}>
                    {bundle.label}
                  </span>
                  <span className="w-full whitespace-normal break-words text-xs text-muted font-arabic leading-relaxed">
                    {bundle.subcopy}
                  </span>
                  {bundle.saving && (
                    <span className="w-full whitespace-normal break-words text-xs text-success font-semibold font-arabic mt-0.5">
                      ✓ {bundle.saving}
                    </span>
                  )}
                </div>

                {/* Price + radio */}
                <div className="flex items-center justify-between gap-2.5 flex-shrink-0 sm:justify-start">
                  <div className="text-left">
                    <p className="font-bold text-primary text-xl font-latin leading-none whitespace-nowrap">
                      {bundle.totalPrice} MAD
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors ${
                      isSelected ? "border-primary bg-primary" : "border-border bg-bg"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-full h-full rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-primary hover:bg-primary-dark active:scale-[0.98] text-white font-arabic font-bold text-lg py-4 rounded-cta transition-all shadow-lg"
      >
        اطلب الآن — {selectedBundle.totalPrice} MAD
      </button>

      {/* Trust row */}
      <div className="flex flex-wrap gap-3 justify-center">
        <span className="flex items-center gap-1 text-xs font-arabic text-muted">
          <ShieldCheck className="w-3.5 h-3.5 text-success" />
          ضمان 30 يوم
        </span>
        <span className="flex items-center gap-1 text-xs font-arabic text-muted">
          <Truck className="w-3.5 h-3.5 text-primary" />
          توصيل 1-5 أيام
        </span>
        <span className="flex items-center gap-1 text-xs font-arabic text-muted">
          <PhoneCall className="w-3.5 h-3.5 text-primary" />
          تأكيد هاتفي 24h
        </span>
      </div>

    </div>
  );
}
