"use client";

import { useState, useEffect } from "react";

const MESSAGES = [
  { icon: "🛡️", text: "كريمي أوطو — خبراء حماية الطوموبيل فالمغرب | منتجات مختبرة ومعتمدة" },
  { icon: "📦", text: "توصيل 24-72h لجميع مدن المغرب — الدفع عند الاستلام فقط" },
  { icon: "⭐", text: "+3,200 سائق مغربي وثقو فكريمي أوطو — شوف آراءهم" },
  { icon: "🔬", text: "منتجات مختبرة للمناخ المغربي — 70°C، رمل، غبار، UV — مضمونة تدوم" },
  { icon: "⚠️", text: "باقي كمية محدودة — المخزون كينفد بسرعة فالصيف" },
  { icon: "🚨", text: "سرقة الطوموبيلات +12% هاد العام فالمغرب — واش طوموبيلتك محمية؟" },
  { icon: "💰", text: "وفر حتى 248 MAD مع عرض الحماية الكاملة — 3 منتجات بثمن واحد" },
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % MESSAGES.length);
        setVisible(true);
      }, 300);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const msg = MESSAGES[current];

  return (
    <div className="bg-primary text-white text-center text-sm py-2 px-4 font-arabic overflow-hidden">
      <span
        className="inline-flex items-center gap-2 transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <span>{msg.icon}</span>
        <span>{msg.text}</span>
      </span>
    </div>
  );
}
