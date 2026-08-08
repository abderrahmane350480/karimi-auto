"use client";

import { useState, useEffect } from "react";

const MESSAGES = [
  { icon: "🔥", text: "الصيف فأوجو — احمي طوموبيلتك من الحرارة والخدوش والسرقة" },
  { icon: "🚚", text: "توصيل سريع 24-72 ساعة — الدفع عند الاستلام" },
  { icon: "⭐", text: "+2,847 مغربي اختار حماية كريمي أوطو" },
  { icon: "🛡️", text: "ضمان 30 يوم — ما عجبكش؟ نرجعو ليك الفلوس" },
  { icon: "📉", text: "العرض محدود — الأسعار غادي ترتفع قريباً" },
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
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
