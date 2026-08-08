"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, PhoneCall, ShieldCheck, Truck, MessageCircle } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";

export default function ThankYouPage() {
  const { confirmedOrder, clearConfirmedOrder } = useCartStore();

  useEffect(() => {
    // Clear after display so refresh doesn't show stale order
    const timer = setTimeout(() => clearConfirmedOrder(), 30 * 60 * 1000);
    return () => clearTimeout(timer);
  }, [clearConfirmedOrder]);

  return (
    <div className="min-h-screen bg-bg py-16 px-4">
      <div className="max-w-md mx-auto">
        {/* Success icon */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          </div>
          <h1 className="text-2xl md:text-3xl font-arabic font-bold text-ink mb-2">
            🎉 الطلبية ديالك مسجلة بنجاح!
          </h1>
          <p className="text-muted font-arabic leading-relaxed">
            غادي نتصلو بيك خلال <span className="font-bold text-ink">2 ساعة</span> للتأكيد. عافاك خلي التيليفون ديالك شاعل وجاوبنا باش ما نتعطلوش عليك.
          </p>
        </div>

        {/* Reassurance block */}
        <div className="bg-success/5 border border-success/30 rounded-2xl p-5 mb-5">
          <div className="space-y-2.5">
            {[
              "الطلبية ديالك محمية بضمان 30 يوم",
              "الدفع غير عند الاستلام — ما كتخلص والو دابا",
              "التوصيل خلال 24-72 ساعة لجميع مدن المغرب",
              "إلا ما عجبكش المنتج ترجعو بلا سؤال",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                <span className="font-arabic text-sm text-ink">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social proof */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-5 text-center">
          <p className="font-arabic text-primary font-bold text-sm">
            🛡️ انضم لـ +2,847 مغربي اللي حمى طوموبيلتو مع كريمي أوطو
          </p>
        </div>

        {/* 24h call reminder — key CRO element */}
        <div className="bg-primary/5 border border-primary/30 rounded-2xl p-4 mb-5 flex items-start gap-3">
          <PhoneCall className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-arabic font-bold text-ink text-sm">
              📞 غادي نتاصلو بك خلال 24 ساعة
            </p>
            <p className="font-arabic text-muted text-xs leading-relaxed mt-0.5">
              خلي تيليفونك يرن — مكالمة قصيرة باش نأكدو عنوانك وموعد التوصيل. بدون التأكيد ما كنرسلوش الطلبية.
            </p>
          </div>
        </div>

        {/* Order summary */}
        {confirmedOrder && (
          <div className="bg-surface border border-border rounded-2xl p-5 mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-arabic font-bold text-ink">ملخص الطلب</h2>
              <span className="text-xs font-latin text-muted bg-bg px-2 py-1 rounded-full">
                {confirmedOrder.orderNumber}
              </span>
            </div>
            <div className="space-y-2 mb-3">
              {confirmedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="font-arabic text-ink line-clamp-1">{item.nameAr}</span>
                  <span className="font-latin font-bold text-primary flex-shrink-0 mr-2">
                    {item.lineTotalMad} MAD
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-bold">
              <span className="font-arabic text-ink">المجموع الكلي</span>
              <span className="font-latin text-primary text-lg">
                {confirmedOrder.grandTotalMad} MAD
              </span>
            </div>
            {confirmedOrder.phone && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted font-arabic">
                  رقم الهاتف للتأكيد:{" "}
                  <span className="font-latin font-semibold text-ink">
                    {confirmedOrder.phone}
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* COD commitment */}
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 mb-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-arabic font-bold text-amber-800 mb-1">⚠️ التزام كريمي أوطو</h3>
              <p className="font-arabic text-amber-700 text-sm leading-relaxed">
                حنا كنتيقو فالجودة ديالنا، داكشي علاش كنصيفطو ليك السلعة تال باب دارك فابور، وتأكد منها عاد خلص. الطلبية ديالك راها كتوجد دابا، المرجو تأكيد الطلب فقط إذا كنتي مستعد تستلمو. التوصيل للمدن الكبرى كياخد 1-2 أيام، وباقي المدن 2-5 أيام.
              </p>
            </div>
          </div>
        </div>

        {/* What's next — numbered steps */}
        <div className="bg-surface border border-border rounded-2xl p-5 mb-6">
          <h3 className="font-arabic font-bold text-ink mb-4">شنو كيوقع دابا</h3>
          <div className="space-y-4">
            {[
              {
                step: "01",
                icon: <PhoneCall className="w-4 h-4 text-primary" />,
                title: "مكالمة تأكيد خلال 24 ساعة",
                desc: "الفريق ديالنا كيتاصل بك لتأكيد عنوانك وموعد التوصيل — خلي التيليفون يرن",
                color: "text-primary",
              },
              {
                step: "02",
                icon: <Truck className="w-4 h-4 text-primary" />,
                title: "إرسال بعد التأكيد",
                desc: "بعد ما نأكدو — الطلبية كتوصل خلال 2-5 أيام عمل لأي مدينة فالمغرب",
                color: "text-primary",
              },
              {
                step: "03",
                icon: <CheckCircle className="w-4 h-4 text-success" />,
                title: "استلام والدفع هناك",
                desc: "تستلم السلعة، تشوفها، وبعدين تخلص — ضمان 30 يوم من يوم الاستلام",
                color: "text-success",
              },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3">
                <span className={`font-latin font-bold text-sm w-6 flex-shrink-0 ${s.color}`}>
                  {s.step}
                </span>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    {s.icon}
                    <p className="font-arabic font-semibold text-ink text-sm">{s.title}</p>
                  </div>
                  <p className="font-arabic text-muted text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support */}
        <div className="text-center mb-8">
          <p className="font-arabic text-muted text-sm mb-3">
            عندك سؤال؟ راسلنا على الواتساب
          </p>
          <a
            href="https://wa.me/212600000000?text=مرحبا%20كريمي%20أوطو%2C%20عندي%20سؤال%20على%20طلبيتي"
            className="inline-flex items-center gap-2 bg-success hover:bg-success/90 text-white font-arabic font-bold px-6 py-3 rounded-cta transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-4 h-4" />
            راسلنا على WhatsApp
          </a>
        </div>

        <div className="text-center">
          <Link
            href="/collections"
            className="text-primary font-arabic hover:underline text-sm"
          >
            تصفح المنتجات الأخرى
          </Link>
        </div>
      </div>
    </div>
  );
}
