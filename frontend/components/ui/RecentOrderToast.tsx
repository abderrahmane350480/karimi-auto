"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, CheckCircle } from "lucide-react";

const ORDERS = [
  { name: "يوسف م.", city: "كازابلانكا", product: "واقي الشمس المظلة", minutes: 3, verified: true },
  { name: "فاطمة ب.", city: "الرباط", product: "سبراي السيراميك نانو", minutes: 7, verified: true },
  { name: "محمد ع.", city: "مراكش", product: "الحماية الكاملة (3 منتجات)", minutes: 4, verified: true },
  { name: "سعيد ل.", city: "طنجة", product: "جهاز GPS ضد السرقة", minutes: 5, verified: true },
  { name: "أمينة ز.", city: "أكادير", product: "واقي الشمس + السيراميك", minutes: 9, verified: true },
  { name: "كريم ش.", city: "فاس", product: "واقي الشمس المظلة", minutes: 2, verified: true },
  { name: "هشام ن.", city: "مكناس", product: "الحماية الكاملة (3 منتجات)", minutes: 11, verified: true },
  { name: "نادية ق.", city: "وجدة", product: "سبراي السيراميك نانو", minutes: 6, verified: true },
  { name: "عبد الله ح.", city: "القنيطرة", product: "جهاز GPS ضد السرقة", minutes: 8, verified: true },
  { name: "ليلى ر.", city: "تمارة", product: "واقي الشمس + GPS", minutes: 3, verified: true },
  { name: "حمزة ت.", city: "سلا", product: "الحماية الكاملة (3 منتجات)", minutes: 14, verified: true },
  { name: "سناء ف.", city: "بني ملال", product: "سبراي السيراميك نانو", minutes: 5, verified: true },
  { name: "رشيد أ.", city: "الجديدة", product: "واقي الشمس المظلة", minutes: 7, verified: true },
  { name: "زكرياء د.", city: "خريبكة", product: "جهاز GPS ضد السرقة", minutes: 10, verified: true },
];

export default function RecentOrderToast() {
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState(ORDERS[0]);
  const idxRef = useRef(0);

  useEffect(() => {
    function showNext() {
      idxRef.current = (idxRef.current + 1) % ORDERS.length;
      setOrder(ORDERS[idxRef.current]);
      setVisible(true);

      const hideTimer = setTimeout(() => setVisible(false), 4500);
      const nextDelay = 20000 + Math.random() * 25000;
      const nextTimer = setTimeout(showNext, nextDelay + 4500);

      return () => {
        clearTimeout(hideTimer);
        clearTimeout(nextTimer);
      };
    }

    const firstDelay = 6000 + Math.random() * 6000;
    const firstTimer = setTimeout(showNext, firstDelay);
    return () => clearTimeout(firstTimer);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-xs w-full pointer-events-none" dir="rtl">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={order.name + order.minutes}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-surface border border-border rounded-2xl shadow-lg px-4 py-3 flex items-start gap-3 pointer-events-auto"
          >
            <div className="w-9 h-9 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShoppingCart className="w-4 h-4 text-success" />
            </div>
            <div className="min-w-0">
              <p className="font-arabic text-ink text-sm leading-snug">
                <span className="font-bold">{order.name}</span> من {order.city} طلب{" "}
                <span className="font-semibold text-primary">{order.product}</span>
              </p>
              <div className="flex items-center gap-2 mt-1">
                <p className="font-arabic text-muted text-xs">
                  قبل {order.minutes} دقائق
                </p>
                {order.verified && (
                  <span className="inline-flex items-center gap-0.5 text-xs text-success font-arabic">
                    <CheckCircle className="w-3 h-3" />
                    مؤكد
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
