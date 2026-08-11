import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import SectionHeader from "@/components/ui/SectionHeader";
import FAQAccordion from "@/components/ui/FAQAccordion";
import TrustStrip from "@/components/ui/TrustStrip";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "منتجات حماية الطوموبيل — كريمي أوطو",
  description: "مجموعة كريمي أوطو لحماية الطوموبيل: واقي الشمس تيتانيوم، سبراي السيراميك نانو، وجهاز GPS ضد السرقة. مختبرة للمناخ المغربي.",
};

const COLLECTION_FAQS = [
  {
    q: "واش يمكن نطلب أكثر من منتج في نفس الطلبية؟",
    a: "إيه، كتقدر تزيد منتجات متعددة للسلة وتأكد طلبية واحدة.",
  },
  {
    q: "واش كاين خصم إلا شريت كثر من منتج؟",
    a: "العروض ديال الحزمة (2 أو 3 قطع) كتوفرلك أكثر مقارنة بشرا قطعة بقطعة.",
  },
  {
    q: "واش المنتجات مناسبة لجميع أنواع السيارات؟",
    a: "إيه، مختارة باش تناسب أغلب السيارات المستعملة فالمغرب.",
  },
];

export default function CollectionsPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-primary text-white py-12 px-4">
        <div className="max-w-content mx-auto text-center">
          <span className="inline-block bg-accent/20 text-accent font-arabic font-semibold text-sm px-3 py-1 rounded-full mb-3">
            خبراء حماية الطوموبيل
          </span>
          <h1 className="text-3xl md:text-4xl font-arabic font-bold mb-3">
            منتجات حماية الطوموبيل
          </h1>
          <p className="text-white/80 font-arabic text-lg max-w-xl mx-auto">
            3 منتجات متخصصة مختبرة للمناخ المغربي — حماية من الحرارة، الخدوش، والسرقة.
          </p>
        </div>
      </section>

      <TrustStrip />

      {/* Products grid */}
      <section className="py-16 px-4">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Bundle education */}
      <section className="py-16 px-4 bg-bg">
        <div className="max-w-content mx-auto">
          <SectionHeader
            badge="توفير أكثر"
            title="اشتري أكثر وكون أكثر استعدادا"
            subtitle="خد 2 أو 3 قطع ووفر أكثر — ولا اكمل المجموعة الكاملة للطوموبيل"
            center
          />
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-surface border border-border rounded-xl p-5 text-center">
              <p className="font-bold text-primary text-2xl font-latin">299 MAD</p>
              <p className="font-arabic text-muted text-sm mt-1">المنتج بوحدو</p>
            </div>
            <div className="bg-primary/5 border-2 border-primary rounded-xl p-5 text-center">
              <span className="text-xs font-arabic font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">الأكثر اختيارا</span>
              <p className="font-bold text-primary text-2xl font-latin mt-2">449 MAD</p>
              <p className="font-arabic text-muted text-sm mt-1">كومبو منتجين — وفر 149 MAD</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5 text-center">
              <span className="text-xs font-arabic font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">أعلى توفير</span>
              <p className="font-bold text-primary text-2xl font-latin mt-2">649 MAD</p>
              <p className="font-arabic text-muted text-sm mt-1">الباقة الكاملة — وفر 248 MAD</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-12 px-4">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-success/10 rounded-2xl p-6">
              <ShieldCheck className="w-8 h-8 text-success mb-3" />
              <h3 className="font-arabic font-bold text-ink text-lg mb-2">
                الدفع عند الاستلام
              </h3>
              <p className="font-arabic text-muted text-sm leading-relaxed">
                ما كتخلص حتى توصلك السلعة وتتأكد منها. هاد الشي كيعطيك راحة البال الكاملة.
              </p>
            </div>
            <div className="bg-primary/5 rounded-2xl p-6">
              <ShieldCheck className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-arabic font-bold text-ink text-lg mb-2">
                ضمان تبديل فحالة العيب
              </h3>
              <p className="font-arabic text-muted text-sm leading-relaxed">
                إلا وصلك المنتج فيه عيب أو مشكل، تاصل بينا خلال 48 ساعة ونحلو المشكل.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 bg-bg">
        <div className="max-w-content mx-auto max-w-2xl">
          <SectionHeader badge="الأسئلة" title="أسئلة شائعة" center />
          <div className="mt-8">
            <FAQAccordion faqs={COLLECTION_FAQS} />
          </div>
        </div>
      </section>
    </>
  );
}
