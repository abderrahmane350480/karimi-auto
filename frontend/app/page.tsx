import Link from "next/link";
import { ShieldCheck, Truck, PhoneCall, PackageCheck, CheckCircle } from "lucide-react";
import TrustStrip from "@/components/ui/TrustStrip";
import SectionHeader from "@/components/ui/SectionHeader";
import ProductCard from "@/components/product/ProductCard";
import ReviewCard from "@/components/ui/ReviewCard";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { PRODUCTS } from "@/data/products";

const PROBLEMS = [
  {
    icon: "☀️",
    title: "حرارة الصيف",
    desc: "الفولون كيحرق يديك؟ الحرارة داخل الطوموبيل كتوصل 70°C فالصيف المغربي. التابلو كيتشقق والجلد كيتبهت.",
    href: "/products/umbrella-sunshade-titanium",
  },
  {
    icon: "🔧",
    title: "الخدوش والغبار",
    desc: "الرمل والشرقي كيخدشو الطلاء كل يوم. الكاروسري كيكلف 5000-15000 درهم. طوموبيلتك كتخسر قيمتها.",
    href: "/products/nano-ceramic-coating-spray",
  },
  {
    icon: "🚨",
    title: "سرقة الطوموبيلات",
    desc: "+12% هاد العام. كازا 38% ديال السرقات. عصابات بأجهزة تشويش إلكترونية. واش طوموبيلتك محمية؟",
    href: "/products/gps-tracker-4g-anti-theft",
  },
];

const HOME_FAQS = [
  {
    q: "كيفاش كيتم التوصيل؟",
    a: "كنتاصلو بك بعد الطلب باش نأكدو العنوان والتفاصيل، ومن بعد كنرسلو السلعة لجميع مدن المغرب.",
  },
  {
    q: "واش الدفع عند الاستلام؟",
    a: "إيه، كتخلص غير حين توصلك السلعة. ما كاينش دفع مسبق.",
  },
  {
    q: "واش يمكن نبدل المنتج إلا جا فيه مشكل؟",
    a: "إيه، عندنا ضمان تبديل فحالة وصل المنتج فيه عيب خلال 48 ساعة من الاستلام.",
  },
  {
    q: "كم يستغرق التوصيل؟",
    a: "بعد التأكيد، التوصيل كيتم عادة خلال 2-5 أيام حسب المدينة.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-content mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <div className="img-placeholder w-full aspect-[4/3] rounded-2xl text-center">
                <div>
                  <div className="text-6xl mb-3">🛡️🚗</div>
                  <p className="text-white/70 font-arabic text-sm">
                    حماية الطوموبيل الكاملة
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <span className="inline-block bg-accent/20 text-accent font-arabic font-semibold text-sm px-3 py-1 rounded-full mb-4">
                اختيار كريمي أوطو
              </span>
              <h1 className="text-3xl md:text-5xl font-arabic font-bold leading-tight mb-4">
                طوموبيلتك كتواجه 3 أعداء كل يوم — الحرارة، الخدوش، والسرقة
              </h1>
              <p className="text-white/80 font-arabic text-lg leading-relaxed mb-8">
                اختيار كريمي أوطو: 3 منتجات ذكية كيحميو طوموبيلتك من الشمس، الغبار، واللصوص — الدفع عند الاستلام
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/collections"
                  className="bg-accent hover:bg-accent/90 text-primary font-arabic font-bold px-6 py-3.5 rounded-cta transition-colors text-base"
                >
                  شوف المنتجات
                </Link>
                <Link
                  href="/about"
                  className="border-2 border-white/40 hover:border-white text-white font-arabic px-6 py-3.5 rounded-cta transition-colors text-base"
                >
                  علاش كريمي أوطو؟
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <TrustStrip />

      {/* PROBLEM CARDS */}
      <section className="py-16 px-4">
        <div className="max-w-content mx-auto">
          <SectionHeader
            badge="3 أعداء يومية"
            title="طوموبيلتك كتواجه هاد المشاكل كل يوم"
            subtitle="كل سائق مغربي عارف هاد المشاكل — كريمي أوطو عندو الحل لكل واحدة"
            center
          />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {PROBLEMS.map((p) => (
              <Link key={p.title} href={p.href} className="group bg-surface border border-border rounded-2xl p-6 text-center hover:border-primary/50 hover:shadow-md transition-all">
                <div className="text-5xl mb-4">{p.icon}</div>
                <h3 className="font-arabic font-bold text-ink text-lg mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-muted font-arabic text-sm leading-relaxed">{p.desc}</p>
                <span className="inline-block mt-3 text-primary font-arabic text-sm font-semibold">شوف الحل ←</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 px-4 bg-bg">
        <div className="max-w-content mx-auto">
          <SectionHeader
            badge="حماية الطوموبيل الكاملة"
            title="3 منتجات ذكية — حماية شاملة"
            subtitle="واقي الشمس + السيراميك + GPS: الثلاثة كيكملو بعضاهم لحماية طوموبيلتك من كل شي"
            center
          />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* BRAND AUTHORITY */}
      <section className="py-16 px-4">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                badge="علاش كريمي أوطو؟"
                title="منتجات مختارة للسائق المغربي"
                subtitle="الثمن ماشي غير على المنتج — الثمن على راحة البال: جودة مختارة، توصيل واضح، وضمان حقيقي."
              />
              <ul className="mt-6 space-y-3">
                {[
                  "3 منتجات كيحمو طوموبيلتك من الحرارة، الخدوش، والسرقة",
                  "مختارة خصيصاً للمناخ المغربي: حرارة، رمل، شمس قوية",
                  "الدفع عند الاستلام — ما خاصكش تخلص مسبقا",
                  "ضمان 30 يوم كامل على كل منتج",
                  "تأكيد هاتفي + توصيل 24-72 ساعة",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 font-arabic text-ink">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="img-placeholder w-full aspect-[4/3] rounded-2xl">
                <div className="text-center">
                  <div className="text-5xl mb-3">🛡️</div>
                  <p className="text-white/70 font-arabic text-sm">حماية الطوموبيل الكاملة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / REVIEWS */}
      <section className="py-16 px-4 bg-bg">
        <div className="max-w-content mx-auto">
          <SectionHeader
            badge="آراء الزبناء"
            title="+2,847 مغربي اختار حماية كريمي أوطو"
            subtitle="زبناء حقيقيين من جميع أنحاء المغرب — نتايج حقيقية"
            center
          />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <ReviewCard
              text="والله فرق الليل والنهار! الفولون ولا بارد حتى فعز الصيف. ندمت ما شريتوش بكري."
              name="يوسف"
              city="مراكش"
            />
            <ReviewCard
              text="طوموبيلتي رجعات كتشعل! الخدوش الدقيقة اختفاو والماء كيزلق بوحدو. منتج خطير."
              name="حمزة"
              city="الرباط"
            />
            <ReviewCard
              text="واحد الصاحب تسرقاتلو طوموبيلتو. من يومها شريت GPS. دابا عارف فين طوموبيلتي 24/7."
              name="محمد"
              city="كازا"
            />
            <ReviewCard
              text="التابلو ديالي كان بادي يتشقق. من يوم حطيت الواقي وقف التلف. شكراً كريمي أوطو."
              name="فاطمة الزهراء"
              city="كازا"
            />
            <ReviewCard
              text="كنت كنمشي للكاروسري كل 3 أشهر بـ 800 درهم. دابا مبقيتش محتاج. وفرت فلوس بزاف."
              name="سعيد"
              city="أكادير"
            />
            <ReviewCard
              text="الولد كياخذ الطوموبيل — كنراقبو من التطبيق وكنعرف فين كيمشي. راحة البال ما عندها ثمن."
              name="كريم"
              city="طنجة"
            />
          </div>
        </div>
      </section>

      {/* BUNDLE / AOV SECTION */}
      <section className="py-16 px-4">
        <div className="max-w-content mx-auto">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-arabic font-bold mb-3">
              اختار مستوى الحماية ديالك
            </h2>
            <p className="text-white/80 font-arabic text-base mb-6 max-w-xl mx-auto">
              حماية الطوموبيل الكاملة — من الحرارة، الخدوش، والسرقة. كل مستوى كيزيد من الحماية.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8 text-center">
              <div className="bg-white/10 rounded-xl p-5">
                <p className="font-arabic text-white/80 text-sm mb-1">حماية واحدة</p>
                <p className="font-arabic font-bold text-accent text-2xl">299 MAD</p>
                <p className="font-arabic text-white/60 text-xs mt-1">أي منتج واحد</p>
              </div>
              <div className="bg-accent/20 border-2 border-accent rounded-xl p-5">
                <span className="text-xs text-accent font-arabic font-bold bg-accent/20 px-2 py-0.5 rounded-full">الأكثر مبيعاً</span>
                <p className="font-arabic font-bold text-accent text-2xl mt-2">449 MAD</p>
                <p className="font-arabic text-white/80 text-sm">حماية مزدوجة — أي منتجين</p>
              </div>
              <div className="bg-white/10 rounded-xl p-5">
                <span className="text-xs text-white font-arabic font-bold bg-white/20 px-2 py-0.5 rounded-full">أعلى توفير</span>
                <p className="font-arabic font-bold text-accent text-2xl mt-2">649 MAD</p>
                <p className="font-arabic text-white/80 text-sm">الحماية الكاملة — 3 منتجات</p>
                <p className="font-arabic text-success text-xs mt-1 font-semibold">✓ وفر 248 MAD</p>
              </div>
            </div>
            <Link
              href="/collections"
              className="inline-block bg-accent hover:bg-accent/90 text-primary font-arabic font-bold px-8 py-4 rounded-cta transition-colors text-base"
            >
              اختار عرضك دابا
            </Link>
          </div>
        </div>
      </section>

      {/* HOW COD WORKS */}
      <section className="py-16 px-4 bg-bg">
        <div className="max-w-content mx-auto">
          <SectionHeader
            badge="كيفاش كيخدم"
            title="طلبية سهلة بالدفع عند الاستلام"
            center
          />
          <div className="grid md:grid-cols-4 gap-6 mt-10">
            {[
              { n: "1", icon: "🛒", label: "اختار المنتج والعرض" },
              { n: "2", icon: "📱", label: "أكد بالاسم ورقم الهاتف" },
              { n: "3", icon: "📦", label: "نأكدو معك بالهاتف ونرسلو" },
              { n: "4", icon: "💵", label: "تخلص عند الاستلام" },
            ].map((step) => (
              <div key={step.n} className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-accent font-bold text-lg mx-auto mb-3">
                  {step.n}
                </div>
                <div className="text-3xl mb-2">{step.icon}</div>
                <p className="font-arabic font-semibold text-ink text-sm">{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-content mx-auto max-w-2xl">
          <SectionHeader badge="الأسئلة الشائعة" title="عندك سؤال؟" center />
          <div className="mt-8">
            <FAQAccordion faqs={HOME_FAQS} />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 px-4 bg-primary text-white text-center">
        <div className="max-w-content mx-auto">
          <h2 className="text-3xl font-arabic font-bold mb-4">
            طوموبيلتك كتستحق الحماية الكاملة
          </h2>
          <p className="text-white/80 font-arabic text-lg mb-8 max-w-lg mx-auto">
            الحرارة، الخدوش، والسرقة ما تستنوش — احمي طوموبيلتك دابا. الدفع عند الاستلام، ضمان 30 يوم.
          </p>
          <Link
            href="/collections"
            className="inline-block bg-accent hover:bg-accent/90 text-primary font-arabic font-bold px-8 py-4 rounded-cta transition-colors text-base"
          >
            احمي طوموبيلتك دابا
          </Link>
        </div>
      </section>
    </>
  );
}
