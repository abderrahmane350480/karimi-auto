"use client";

import type { Product } from "@/data/products";
import { useCartStore } from "@/stores/cart-store";
import { generateEventId } from "@/lib/tracking/ids";
import { trackAddToCart } from "@/lib/tracking/events";

interface StickyMobileCTAProps {
  product: Product;
}

export default function StickyMobileCTA({ product }: StickyMobileCTAProps) {
  const { addItem, openCart } = useCartStore();

  // Always add the single-item bundle at base price 299
  const singleBundle = product.crossSellBundles[0];

  function handleAddToCart() {
    const eventId = generateEventId();
    addItem({
      productId: product.id,
      slug: product.slug,
      nameAr: product.shortArabicName,
      quantity: 1,
      bundlePieces: 1,
      unitOfferPrice: 299,
      totalPrice: 299,
      source: "product_page",
      addToCartEventId: eventId,
    });
    trackAddToCart({ slug: product.slug, price: 299, quantity: 1 }, eventId);
    openCart();
  }

  return (
    <div className="md:hidden fixed bottom-0 right-0 left-0 z-20 bg-surface border-t border-border px-4 py-3 flex items-center gap-3 shadow-lg">
      <div className="flex flex-col">
        <span className="text-xs text-muted font-arabic">ابدا من</span>
        <span className="font-bold text-primary text-lg font-latin">299 MAD</span>
      </div>
      <button
        onClick={handleAddToCart}
        className="flex-1 bg-primary hover:bg-primary-dark text-white font-arabic font-bold py-3.5 rounded-cta transition-colors"
      >
        طلب دابا بـ 299 درهم
      </button>
    </div>
  );
}
