import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ShieldCheck, PhoneCall, Truck } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "من نحن — كريمي أوطو",
  description: "اعرف أكثر على كريمي أوطو — منتجات مختارة للطوموبيل فالمغرب.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="max-w-content mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-arabic font-bold mb-4">
            من نحن
          </h1>
          <p className="text-white/80 font-arabic text-lg max-w-2xl mx-auto">
            كريمي أوطو — علامة تجارية مغربية مختصة في منتجات الطوموبيل العملية والذكية.
          </p>
        </div>
      </section>

      {/* Brand story */}
      <section className="py-16 px-4">
        <div className="max-w-content mx-auto max-w-3xl">
          <SectionHeader badge="حكايتنا" title="علاش بنينا كريمي أوطو" />
          <div className="mt-6 space-y-4 font-arabic text-ink leading-relaxed">
            <p>
              كريمي أوطو ولدت من ملاحظة بسيطة: كثير من السائقين المغاربة كيواجهو مشاكل يومية صغيرة فالطوموبيل — غبرة تتراكم، تيليفون يطيح بين الكراسي، رويضة مفشوشة فالطريق — وما كيلقاوش حلول واضحة وبثمن مناسب.
            </p>
            <p>
              هكذا جاءت الفكرة: نختارو منتجات عملية، نتحققو من جودتها، ونوصلوها لكل مدن المغرب بالدفع عند الاستلام. بدون تعقيدات.
            </p>
            <p>
              الهدف ماشي غير بيع منتجات — الهدف نضيفو قيمة حقيقية لتجربة القيادة اليومية ديالك.
            </p>
          </div>
        </div>
      </section>

      {/* Selection process */}
      <section className="py-16 px-4 bg-bg">
        <div className="max-w-content mx-auto max-w-3xl">
          <SectionHeader badge="كيف نختار" title="عملية الاختيار ديالنا" />
          <ul className="mt-8 space-y-4">
            {[
              "نبحث على منتجات كتحل مشاكل يومية حقيقية للسائق المغربي",
              "نتحقق من المواصفات والمواد قبل الإضافة للمجموعة",
              "نضمن أن كل منتج مناسب للاستعمال اليومي فالظروف المغربية",
              "نقدم معلومات واضحة وشفافة بدون مبالغة",
              "نبقاو على تواصل مع الزبناء قبل وبعد التوصيل",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 font-arabic text-ink">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* COD process */}
      <section className="py-16 px-4">
        <div className="max-w-content mx-auto max-w-3xl">
          <SectionHeader badge="الدفع عند الاستلام" title="كيفاش كيخدم نظام الطلب" />
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {[
              { icon: <ShieldCheck className="w-6 h-6 text-success" />, title: "الدفع عند الاستلام", desc: "ما كتخلص حتى توصلك السلعة وتشوفها." },
              { icon: <PhoneCall className="w-6 h-6 text-primary" />, title: "تأكيد هاتفي", desc: "غادي نتاصلو بك قبل الإرسال باش نأكدو العنوان والتفاصيل." },
              { icon: <Truck className="w-6 h-6 text-primary" />, title: "توصيل بالمغرب", desc: "كنوصلو لجميع المدن — عادة خلال 2-5 أيام." },
              { icon: <CheckCircle className="w-6 h-6 text-success" />, title: "ضمان تبديل", desc: "إلا كان المنتج فيه عيب، نبدلوه بدون تعقيدات." },
            ].map((item) => (
              <div key={item.title} className="bg-surface border border-border rounded-2xl p-5">
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-arabic font-bold text-ink text-base mb-1">{item.title}</h3>
                <p className="font-arabic text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-primary text-white text-center">
        <div className="max-w-content mx-auto">
          <h2 className="text-2xl font-arabic font-bold mb-4">
            جاهز تكمل مجموعتك؟
          </h2>
          <Link
            href="/collections"
            className="inline-block bg-accent hover:bg-accent/90 text-primary font-arabic font-bold px-8 py-4 rounded-cta transition-colors"
          >
            تسوق المنتجات
          </Link>
        </div>
      </section>
    </>
  );
}
