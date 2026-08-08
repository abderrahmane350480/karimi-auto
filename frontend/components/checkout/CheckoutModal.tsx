"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Truck, PhoneCall, AlertCircle } from "lucide-react";

function useSessionStockCount() {
  const ref = useRef<number | null>(null);
  if (ref.current === null) {
    const NON_ROUND = [7, 9, 11, 13, 14, 17, 19, 21, 23];
    ref.current = NON_ROUND[Math.floor(Math.random() * NON_ROUND.length)];
  }
  return ref.current;
}
import { useCartStore } from "@/stores/cart-store";
import { PRODUCTS, getUpsellProduct } from "@/data/products";
import { validateMoroccanPhone, normalizeMoroccanPhone } from "@/lib/phone";
import { generateEventId } from "@/lib/tracking/ids";

const schema = z.object({
  name: z.string().min(2, "الاسم قصير جدا").max(100),
  phone: z
    .string()
    .min(9, "أدخل رقم هاتف مغربي صالح")
    .refine((v) => validateMoroccanPhone(v), {
      message: "أدخل رقم هاتف مغربي صالح (06 أو 07)",
    }),
});

type FormValues = z.infer<typeof schema>;

export default function CheckoutModal() {
  const {
    items,
    isCheckoutOpen,
    closeCheckout,
    openUpsell,
    getSubtotal,
    getCartSlugs,
  } = useCartStore();

  const subtotal = getSubtotal();
  const stockCount = useSessionStockCount();
  const [committed, setCommitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (!isCheckoutOpen) {
      reset();
      setCommitted(false);
    }
  }, [isCheckoutOpen, reset]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCheckout();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closeCheckout]);

  function onSubmit(values: FormValues) {
    const { e164 } = normalizeMoroccanPhone(values.phone);
    const checkoutEventId = generateEventId();
    const purchaseEventId = generateEventId();

    // Always find the best upsell; if all products in cart, use first product as nominal upsell
    // (UpsellModal will see upsellAccepted is false and won't add duplicate if slug already in cart)
    const upsellProduct = getUpsellProduct(getCartSlugs()) ?? PRODUCTS[0];

    openUpsell(upsellProduct, {
      name: values.name.trim(),
      phoneRaw: values.phone,
      phoneE164: e164,
      checkoutEventId,
      purchaseEventId,
    });
  }

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeCheckout();
          }}
        >
          <motion.div
            className="bg-surface rounded-2xl w-full max-w-md shadow-2xl mx-auto my-auto"
            style={{ maxHeight: "calc(100dvh - 2rem)", overflowY: "auto" }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="font-arabic font-bold text-lg text-ink">
                أكد الطلب بالدفع عند الاستلام
              </h2>
              <button
                onClick={closeCheckout}
                className="p-1 text-muted hover:text-ink"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-5 py-5">
              {/* CRO commitment banner — reduces fake orders */}
              <div className="bg-amber-50 border border-amber-300 rounded-xl px-4 py-3 mb-4">
                <p className="font-arabic text-amber-800 text-sm leading-relaxed font-semibold">
                  ⚠️ التزام كريمي أوطو:
                </p>
                <p className="font-arabic text-amber-700 text-xs leading-relaxed mt-0.5">
                  حنا كنتيقو فالجودة ديالنا، داكشي علاش كنصيفطو ليك السلعة تال باب دارك فابور، وتأكد منها عاد خلص. الطلبية ديالك راها كتوجد دابا، المرجو تأكيد الطلب فقط إذا كنتي مستعد تستلمو. التوصيل للمدن الكبرى كياخد 1-2 أيام، وباقي المدن 2-5 أيام.
                </p>
              </div>

              {/* Order summary */}
              <div className="bg-bg rounded-xl p-4 mb-5">
                <p className="font-arabic font-semibold text-sm text-muted mb-2">
                  ملخص الطلب
                </p>
                <div className="flex flex-col gap-1">
                  {items.map((item) => (
                    <div key={item.lineId} className="flex justify-between items-center">
                      <span className="text-sm font-arabic text-ink line-clamp-1">
                        {item.nameAr} ×{" "}
                        {item.bundlePieces === 1
                          ? "1 قطعة"
                          : item.bundlePieces === 2
                          ? "2 قطع"
                          : "3 قطع"}
                      </span>
                      <span className="font-bold text-primary font-latin text-sm flex-shrink-0">
                        {item.totalPrice} MAD
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border mt-2 pt-2 flex justify-between">
                  <span className="font-arabic font-bold text-ink">المجموع</span>
                  <span className="font-bold text-primary text-lg font-latin">
                    {subtotal} MAD
                  </span>
                </div>
              </div>

              {/* Stock counter */}
              <div className="flex items-center gap-2 bg-urgency/10 border border-urgency/30 rounded-xl px-4 py-2.5 mb-4">
                <span className="w-2 h-2 rounded-full bg-urgency animate-pulse flex-shrink-0" />
                <p className="font-arabic text-urgency text-sm font-bold">
                  باقي فقط {stockCount} قطعة فالمخزون — الطلب عالي هاد الأيام
                </p>
              </div>

              {/* COD + Guarantee notice */}
              <div className="flex items-start gap-2 bg-success/10 rounded-lg px-4 py-3 mb-5">
                <ShieldCheck className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-arabic font-semibold text-success text-sm">
                    الدفع عند الاستلام + ضمان 30 يوم
                  </p>
                  <p className="text-xs text-success/80 font-arabic">
                    ما كتخلص حتى توصلك commande. غادي نتاصلو بك خلال 24 ساعة للتأكيد — خلي الهاتف يرن.
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-arabic font-semibold text-ink mb-1">
                    الاسم الكامل
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="مثال: محمد العلوي"
                    className="w-full border border-border rounded-xl px-4 py-3 font-arabic text-ink placeholder:text-muted focus:outline-none focus:border-primary bg-bg"
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="text-urgency text-xs font-arabic mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-arabic font-semibold text-ink mb-1">
                    رقم الهاتف
                  </label>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="0612345678"
                    dir="ltr"
                    className="w-full border border-border rounded-xl px-4 py-3 font-latin text-ink placeholder:text-muted focus:outline-none focus:border-primary bg-bg text-right"
                    style={{ textAlign: "right" }}
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <p className="text-urgency text-xs font-arabic mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone.message}
                    </p>
                  )}
                  <p className="text-xs text-muted font-arabic mt-1">
                    رقم مغربي فقط (06 أو 07) — غادي نتاصلو بيك للتأكيد
                  </p>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-arabic text-muted">
                    <Truck className="w-3.5 h-3.5 text-primary" />
                    توصيل جميع مدن المغرب
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-arabic text-muted">
                    <PhoneCall className="w-3.5 h-3.5 text-primary" />
                    تأكيد هاتفي خلال 24h
                  </div>
                </div>

                {/* Commitment checkbox — #1 CRO tactic for reducing fake orders */}
                <label className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${committed ? "border-success bg-success/5" : "border-border bg-bg"}`}>
                  <input
                    type="checkbox"
                    checked={committed}
                    onChange={(e) => setCommitted(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded flex-shrink-0 mt-0.5 border-2 flex items-center justify-center transition-colors ${committed ? "bg-success border-success" : "border-border bg-white"}`}>
                    {committed && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="font-arabic text-sm text-ink leading-relaxed">
                    إيه، أنا متأكد من الطلب وغادي نستلمو ونخلص عند التسليم
                  </span>
                </label>
                <p className="text-center text-muted text-xs font-arabic -mt-2">
                  نحنا كنأكدو كل طلب بالتيليفون. المنتج كيتوجد خصيصاً ليك.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting || !committed}
                  className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-arabic font-bold py-4 rounded-cta text-lg transition-colors"
                >
                  {isSubmitting ? "جاري التأكيد..." : "أكد الطلب — الدفع عند الاستلام"}
                </button>

                <p className="text-center text-muted text-xs font-arabic">
                  بتأكيد الطلب كتوافق على استلام مكالمة تأكيد خلال 24 ساعة
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
