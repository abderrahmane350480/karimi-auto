"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";

const ORDERS = [
  { name: "يوسف", city: "كازا", product: "واقي الشمس المظلة", minutes: 3 },
  { name: "فاطمة", city: "الرباط", product: "سبراي السيراميك", minutes: 7 },
  { name: "محمد", city: "مراكش", product: "الحماية الكاملة", minutes: 12 },
  { name: "سعيد", city: "طنجة", product: "جهاز GPS", minutes: 5 },
  { name: "أمينة", city: "أكادير", product: "واقي الشمس + السيراميك", minutes: 9 },
  { name: "كريم", city: "فاس", product: "واقي الشمس المظلة", minutes: 2 },
  { name: "هشام", city: "مكناس", product: "الحماية الكاملة", minutes: 15 },
  { name: "نادية", city: "وجدة", product: "سبراي السيراميك", minutes: 6 },
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

      // Auto-dismiss after 4 seconds
      const hideTimer = setTimeout(() => setVisible(false), 4000);

      // Schedule next toast in 25-45 seconds
      const nextDelay = 25000 + Math.random() * 20000;
      const nextTimer = setTimeout(showNext, nextDelay + 4000);

      return () => {
        clearTimeout(hideTimer);
        clearTimeout(nextTimer);
      };
    }

    // First toast appears after 8-15 seconds
    const firstDelay = 8000 + Math.random() * 7000;
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
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShoppingCart className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-arabic text-ink text-sm leading-snug">
                <span className="font-bold">{order.name}</span> من {order.city} طلب{" "}
                <span className="font-semibold text-primary">{order.product}</span>
              </p>
              <p className="font-arabic text-muted text-xs mt-0.5">
                قبل {order.minutes} دقائق
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
