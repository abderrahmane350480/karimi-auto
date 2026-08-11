import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ShieldCheck, PhoneCall, Truck, Search, Beaker, Award, Users } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "من نحن — كريمي أوطو | خبراء حماية الطوموبيل",
  description: "كريمي أوطو — متخصصون فحماية السيارات فالمغرب. منتجات مختبرة للمناخ المغربي وضمان حقيقي.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="max-w-content mx-auto text-center">
          <span className="inline-block bg-accent/20 text-accent font-arabic font-semibold text-sm px-3 py-1 rounded-full mb-4">
            خبراء حماية الطوموبيل فالمغرب
          </span>
          <h1 className="text-3xl md:text-4xl font-arabic font-bold mb-4">
            من نحن
          </h1>
          <p className="text-white/80 font-arabic text-lg max-w-2xl mx-auto">
            كريمي أوطو — علامة مغربية متخصصة فحماية السيارات. ماشي متجر عادي، ولكن خبراء كيفهمو مشاكل السائق المغربي وكيقدمو حلول حقيقية.
          </p>
        </div>
      </section>

      {/* Brand story */}
      <section className="py-16 px-4">
        <div className="max-w-content mx-auto max-w-3xl">
          <SectionHeader badge="حكايتنا" title="علاش أسسنا كريمي أوطو" />
          <div className="mt-6 space-y-4 font-arabic text-ink leading-relaxed">
            <p>
              كل سائق مغربي كيعرف هاد المشاكل: الفولون كيحرق فالصيف، الطلاء كيتخدش من الغبار والرمل، وسرقة الطوموبيلات كتزيد كل عام. ومع ذلك، الحلول اللي فالسوق إما غالية بزاف، إما رخيصة وما كتصلحش.
            </p>
            <p>
              كريمي أوطو ولدت من هاد الملاحظة: السائق المغربي محتاج خبير يفهم المشاكل ديالو ويقدملو منتجات مختبرة ومعتمدة — ماشي أي حاجة من الإنترنت. حنا ما كنبيعوش كل شي. تخصصنا واحد: <strong>حماية الطوموبيل</strong>.
            </p>
            <p>
              كل منتج فمجموعتنا مرّ من عملية اختيار صارمة: بحث فالسوق، اختبار المواد، تحقق من المواصفات، وتجربة فالظروف المغربية. اللي ما يمرش — ما نبيعوهش.
            </p>
          </div>
        </div>
      </section>

      {/* Selection process */}
      <section className="py-16 px-4 bg-bg">
        <div className="max-w-content mx-auto max-w-3xl">
          <SectionHeader badge="عملية الاختيار" title="كيفاش كنختارو المنتجات ديالنا" subtitle="4 مراحل صارمة قبل ما أي منتج يدخل لمجموعة كريمي أوطو" />
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            {[
              { icon: <Search className="w-6 h-6 text-primary" />, title: "البحث والتحليل", desc: "كنحددو مشاكل حقيقية يومية للسائق المغربي وكنبحثو على أحسن الحلول العالمية." },
              { icon: <Beaker className="w-6 h-6 text-primary" />, title: "اختبار المواد", desc: "كنتحققو من المواصفات والمواد — نسيج التيتانيوم، تركيبة SiO2، شبكة 4G — كل شي بالتفصيل." },
              { icon: <Award className="w-6 h-6 text-accent" />, title: "تجربة فالمغرب", desc: "كنختبرو فالظروف المغربية: حرارة 70°C، غبار، رمل، شمس قوية. اللي ما يتحملش — ما نبيعوهش." },
              { icon: <Users className="w-6 h-6 text-success" />, title: "موافقة الزبناء", desc: "كنتبعو الرضا ديال الزبناء ونسبة الإرجاع. المنتج خاصو يحقق نتائج حقيقية." },
            ].map((step) => (
              <div key={step.title} className="bg-surface border border-border rounded-2xl p-5">
                <div className="mb-3">{step.icon}</div>
                <h3 className="font-arabic font-bold text-ink text-base mb-1">{step.title}</h3>
                <p className="font-arabic text-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What makes us different */}
      <section className="py-16 px-4">
        <div className="max-w-content mx-auto max-w-3xl">
          <SectionHeader badge="الفرق ديالنا" title="شنو كيفرقنا على باقي المتاجر" />
          <ul className="mt-8 space-y-4">
            {[
              "تخصص واحد فقط — حماية الطوموبيل. ما كنبيعوش أي حاجة خرا. هاد التخصص كيخلينا نعرفو بالضبط شنو كيصلح وشنو لا",
              "كنشرحو العلم وراء المنتج — المواد، التقنية، والحقائق العلمية. ماشي غير هايب وكلام فارغ",
              "مختبر للمناخ المغربي — الحرارة، الرمل، الغبار، الشمس القوية. منتجات أوروبية ولا آسيوية بلا اختبار ما كنقبلوهاش",
              "الدفع عند الاستلام + ضمان 30 يوم — بلا أي مخاطرة عليك. حنا كنتيقو فالجودة ديالنا",
              "تأكيد هاتفي لكل طلبية — فريقنا كيتاصل بيك قبل الإرسال. ماشي رسالة أوتوماتيكية",
              "+3,200 سائق مغربي اختاروها — من كازا لأكادير، من طنجة لوجدة. نتائج حقيقية",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 font-arabic text-ink text-sm leading-relaxed">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* COD process */}
      <section className="py-16 px-4 bg-bg">
        <div className="max-w-content mx-auto max-w-3xl">
          <SectionHeader badge="كيفاش كيخدم" title="نظام الطلب — بسيط وآمن" />
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {[
              { icon: <ShieldCheck className="w-6 h-6 text-success" />, title: "الدفع عند الاستلام", desc: "ما كتخلص حتى توصلك السلعة وتشوفها بعينك. بلا كارطة بانكير." },
              { icon: <PhoneCall className="w-6 h-6 text-primary" />, title: "تأكيد هاتفي 24h", desc: "فريقنا كيتاصل بيك خلال 24 ساعة باش يأكد العنوان والتفاصيل." },
              { icon: <Truck className="w-6 h-6 text-primary" />, title: "توصيل 24-72h", desc: "كنوصلو لجميع مدن المغرب. المدن الكبرى 1-2 أيام، الباقي 2-5 أيام." },
              { icon: <CheckCircle className="w-6 h-6 text-success" />, title: "ضمان 30 يوم", desc: "إلا كان المنتج فيه عيب — نبدلوه فورا بلا سؤال ولا تعقيد." },
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
          <h2 className="text-2xl font-arabic font-bold mb-3">
            طوموبيلتك كتستحق حماية متخصصة
          </h2>
          <p className="text-white/70 font-arabic text-base mb-6 max-w-lg mx-auto">
            شوف المنتجات اللي اختارها +3,200 سائق مغربي — الدفع عند الاستلام.
          </p>
          <Link
            href="/collections"
            className="inline-block bg-accent hover:bg-accent/90 active:scale-[0.98] text-primary font-arabic font-bold px-8 py-4 rounded-cta transition-all shadow-lg"
          >
            شوف المنتجات
          </Link>
        </div>
      </section>
    </>
  );
}
