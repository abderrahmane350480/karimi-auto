"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCartStore } from "@/stores/cart-store";
import { generateEventId } from "@/lib/tracking/ids";
import { trackAddToCart } from "@/lib/tracking/events";

interface CrossSellCardProps {
  product: Product;
}

export default function CrossSellCard({ product }: CrossSellCardProps) {
  const { addItem } = useCartStore();

  function handleQuickAdd() {
    const eventId = generateEventId();
    addItem({
      productId: product.id,
      slug: product.slug,
      nameAr: product.arabicName,
      quantity: 1,
      bundlePieces: 1,
      unitOfferPrice: 299,
      totalPrice: 299,
      source: "cart_cross_sell",
      addToCartEventId: eventId,
    });
    trackAddToCart({ slug: product.slug, price: 299, quantity: 1 }, eventId);
  }

  return (
    <div className="flex items-center gap-3 bg-bg rounded-xl p-3 border border-border">
      {/* Replace with real product image before launch */}
      <div className="img-placeholder w-16 h-16 rounded-lg flex-shrink-0 text-xs">
        <span className="text-white/60">🚗</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-primary font-arabic font-semibold mb-0.5">
          كيكمل نفس المجموعة ديال كريمي أوطو
        </p>
        <p className="text-sm font-arabic font-bold text-ink leading-tight line-clamp-2">
          {product.shortHeadline}
        </p>
        <p className="text-primary font-bold font-latin text-sm mt-0.5">299 MAD</p>
      </div>
      <button
        onClick={handleQuickAdd}
        className="flex-shrink-0 bg-primary hover:bg-primary-dark text-white rounded-full p-2 transition-colors"
        aria-label={`أضف ${product.arabicName}`}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
