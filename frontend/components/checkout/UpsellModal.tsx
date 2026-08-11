"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/stores/cart-store";
import { createOrder } from "@/lib/api";
import { loadAttribution } from "@/lib/tracking/attribution";
import { trackPurchase, trackUpsellView, trackUpsellAccept } from "@/lib/tracking/events";
import { UPSELL_PRICE } from "@/data/products";

const UPSELL_DURATION = 12; // seconds

export default function UpsellModal() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(UPSELL_DURATION);
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const {
    isUpsellOpen,
    upsellProduct,
    pendingCheckout,
    items,
    skipUpsell,
    clearCart,
    setConfirmedOrder,
    getSubtotal,
    getCartSlugs,
  } = useCartStore();

  useEffect(() => {
    if (isUpsellOpen) {
      setTimeLeft(UPSELL_DURATION);
      setAccepted(false);
      setError(null);
      trackUpsellView();
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            // Auto-skip when timer expires
            setTimeout(() => finalize(false), 0);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpsellOpen]);

  async function finalize(withUpsell: boolean) {
    if (!pendingCheckout || !upsellProduct) return;
    setLoading(true);
    setError(null);

    const baseItems = items.map((i) => ({
      slug: i.slug,
      bundlePieces: i.bundlePieces,
      quantity: i.quantity,
      source: i.source,
    }));

    const finalItems = withUpsell
      ? [
          ...baseItems,
          {
            slug: upsellProduct.slug,
            bundlePieces: 1,
            quantity: 1,
            source: "upsell" as const,
          },
        ]
      : baseItems;

    const subtotal = getSubtotal();
    const upsellTotal = withUpsell ? UPSELL_PRICE : 0;
    const grandTotal = subtotal + upsellTotal;

    const attr = loadAttribution();

    try {
      const order = await createOrder({
        customer: {
          name: pendingCheckout.name,
          phoneRaw: pendingCheckout.phoneRaw,
          phoneE164: pendingCheckout.phoneE164,
        },
        cart: finalItems,
        totals: { subtotal, upsellTotal, grandTotal, currency: "MAD" },
        attribution: {
          landingPage: attr.landingPage,
          referrer: attr.referrer,
          fbclid: attr.fbclid,
          ttclid: attr.ttclid,
          sc_click_id: attr.sc_click_id,
          utm_source: attr.utm_source,
          utm_medium: attr.utm_medium,
          utm_campaign: attr.utm_campaign,
          utm_content: attr.utm_content,
          utm_term: attr.utm_term,
        },
        tracking: {
          checkoutEventId: pendingCheckout.checkoutEventId,
          purchaseEventId: pendingCheckout.purchaseEventId,
          fbp: attr.fbp,
          fbc: attr.fbc,
          ttp: attr.ttp,
          scid: attr.scid,
        },
      });

      if (withUpsell) trackUpsellAccept(UPSELL_PRICE);

      trackPurchase({
        orderId: order.orderId,
        orderNumber: order.orderNumber,
        total: order.grandTotalMad,
        slugs: finalItems.map((i) => i.slug),
        purchaseEventId: pendingCheckout.purchaseEventId,
      });

      setConfirmedOrder({
        ...order,
        customerName: pendingCheckout.name,
        phone: pendingCheckout.phoneE164,
      });
      clearCart();
      router.push("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل إرسال الطلب. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  function handleAccept() {
    if (timerRef.current) clearInterval(timerRef.current);
    setAccepted(true);
    finalize(true);
  }

  function handleSkip() {
    if (timerRef.current) clearInterval(timerRef.current);
    skipUpsell();
    finalize(false);
  }

  const subtotal = getSubtotal();

  return (
    <AnimatePresence>
      {isUpsellOpen && upsellProduct && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-surface rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95 }}
          >
            {/* Timer bar */}
            <div className="h-1.5 bg-border">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: "100%" }}
                animate={{ width: `${(timeLeft / UPSELL_DURATION) * 100}%` }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </div>

            <div className="px-5 py-5">
              {/* Header */}
              <div className="text-center mb-4">
                <span className="inline-block bg-urgency/10 text-urgency font-arabic font-bold text-sm px-3 py-1 rounded-full mb-2">
                  عرض خاص — {timeLeft}ث متبقية
                </span>
                <h2 className="font-arabic font-bold text-xl text-ink">
                  عرض خاص غير قبل ما نكملو الطلب
                </h2>
              </div>

              {/* Upsell product */}
              <div className="flex items-center gap-4 bg-bg rounded-xl p-4 mb-5 border border-accent/30">
                <div className="relative w-20 h-20 rounded-xl flex-shrink-0 overflow-hidden bg-white border border-border">
                  <Image src={upsellProduct.images[0]} alt={upsellProduct.shortArabicName} fill className="object-contain p-1" sizes="80px" />
                </div>
                <div className="flex-1">
                  <p className="font-arabic font-bold text-ink text-base leading-snug mb-1">
                    {upsellProduct.shortHeadline}
                  </p>
                  <p className="text-xs text-muted font-arabic mb-2">
                    {upsellProduct.promise}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary text-2xl font-latin">
                      {UPSELL_PRICE} MAD
                    </span>
                    <span className="line-through text-muted text-sm font-latin">
                      299 MAD
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-center text-sm font-arabic text-muted mb-4">
                زيد{" "}
                <strong className="text-ink">{upsellProduct.shortArabicName}</strong>{" "}
                ب{" "}
                <strong className="text-primary">{UPSELL_PRICE} درهم فقط</strong>{" "}
                وخليه يوصل مع نفس الطلبية.
              </p>

              {error && (
                <div className="bg-urgency/10 text-urgency text-sm font-arabic rounded-lg px-4 py-3 mb-4">
                  {error}
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAccept}
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-arabic font-bold py-4 rounded-cta text-base transition-colors"
                >
                  {loading && accepted
                    ? "جاري الإرسال..."
                    : `نعم، زيدها ب ${UPSELL_PRICE} درهم`}
                </button>
                <button
                  onClick={handleSkip}
                  disabled={loading}
                  className="w-full border border-border hover:border-primary text-muted hover:text-ink font-arabic py-3 rounded-cta text-sm transition-colors"
                >
                  {loading && !accepted ? "جاري الإرسال..." : "لا، كمل الطلب"}
                </button>
              </div>

              <p className="text-center text-xs text-muted font-arabic mt-3">
                {accepted
                  ? `المجموع الكلي: ${subtotal + UPSELL_PRICE} MAD`
                  : `طلبيتك الحالية: ${subtotal} MAD${timeLeft > 0 ? ` ← ${subtotal + UPSELL_PRICE} MAD مع العرض` : ""}`}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
