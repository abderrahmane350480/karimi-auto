"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Trash2, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/stores/cart-store";
import { getCrossSellProducts, getProductImage } from "@/data/products";
import { generateEventId } from "@/lib/tracking/ids";
import { trackInitiateCheckout } from "@/lib/tracking/events";
import CrossSellCard from "./CrossSellCard";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    isCheckoutOpen,
    closeCart,
    removeItem,
    openCheckout,
    getSubtotal,
    getCartSlugs,
  } = useCartStore();

  const subtotal = getSubtotal();
  const crossSells = getCrossSellProducts(getCartSlugs());

  // Close on Escape only when checkout is not open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isCheckoutOpen) closeCart();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closeCart, isCheckoutOpen]);

  // Prevent body scroll
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  function handleCheckout(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const eventId = generateEventId();
    trackInitiateCheckout(subtotal, eventId);
    // Cart stays open in background — checkout modal appears on top
    openCheckout();
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay — disabled when checkout is open on top */}
          <motion.div
            className="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isCheckoutOpen ? undefined : closeCart}
            style={{ pointerEvents: isCheckoutOpen ? "none" : "auto" }}
          />

          {/* Drawer — slides in from left in RTL */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-bg flex flex-col shadow-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-border bg-surface">
              <h2 className="font-arabic font-bold text-lg text-ink">السلة</h2>
              <button onClick={closeCart} className="p-1 text-muted hover:text-ink" aria-label="إغلاق">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {items.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-center">
                  <div>
                    <p className="text-4xl mb-3">🛒</p>
                    <p className="text-muted font-arabic">السلة فارغة</p>
                  </div>
                </div>
              ) : (
                <>
                  {items.map((item) => (
                    <div key={item.lineId} className="flex items-center gap-3 bg-surface rounded-xl p-3 border border-border">
                      <div className="relative w-14 h-14 rounded-lg flex-shrink-0 overflow-hidden bg-white border border-border">
                        <Image src={getProductImage(item.slug)} alt={item.nameAr} fill className="object-contain p-1" sizes="56px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-arabic font-semibold text-sm text-ink leading-tight line-clamp-2">
                          {item.nameAr}
                        </p>
                        <p className="text-xs text-muted font-arabic">
                          {item.source === "cross_sell_addon"
                            ? "إضافة من الكيت"
                            : item.bundlePieces === 1
                            ? "قطعة واحدة"
                            : item.bundlePieces === 2
                            ? "جوج قطع"
                            : "ثلاثة قطع"}
                        </p>
                        <p className="font-bold text-primary font-latin text-sm">{item.totalPrice} MAD</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.lineId)}
                        className="p-1.5 text-muted hover:text-urgency transition-colors"
                        aria-label="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {/* Cross-sells */}
                  {crossSells.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs font-arabic font-semibold text-muted mb-2 uppercase tracking-wide">
                        منتجات مكملة
                      </p>
                      <div className="flex flex-col gap-2">
                        {crossSells.map((p) => (
                          <CrossSellCard key={p.slug} product={p} />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-4 py-4 bg-surface">
                {/* Trust */}
                <div className="flex items-center gap-2 bg-success/10 rounded-lg px-3 py-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-success flex-shrink-0" />
                  <p className="text-xs font-arabic text-success font-semibold">
                    الدفع عند الاستلام + ضمان 30 يوم — ما كتخلص حتى توصلك السلعة
                  </p>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="font-arabic font-bold text-ink">المجموع</span>
                  <span className="font-bold text-primary text-xl font-latin">{subtotal} MAD</span>
                </div>

                <button
                  onClick={handleCheckout}
                  type="button"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-arabic font-bold py-4 rounded-cta transition-colors text-lg"
                >
                  أكد الطلب
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
