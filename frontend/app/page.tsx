import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Truck, PhoneCall, PackageCheck, CheckCircle, AlertTriangle, Flame, Eye } from "lucide-react";
import TrustStrip from "@/components/ui/TrustStrip";
import SectionHeader from "@/components/ui/SectionHeader";
import ProductCard from "@/components/product/ProductCard";
import ReviewCard from "@/components/ui/ReviewCard";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { PRODUCTS } from "@/data/products";

const PROBLEMS = [
  {
    icon: "🔥",
    title: "حرارة كتقتل الداخلية",
    stat: "70°C",
    statLabel: "داخل الطوموبيل",
    desc: "كل نهار فالصيف كتفتح باب الطوموبيل وكتحس بحال شي فرن. الفولون كيحرق يديك بالحقيقة. التابلو كيتشقق. الجلد كيتبهت. كل يوم بلا حماية = ضرر ما يتصلحش.",
    href: "/products/umbrella-sunshade-titanium",
    cta: "شوف الحل — واقي الشمس تيتانيوم",
  },
  {
    icon: "😤",
    title: "خدوش كل يوم بلا ما تحس",
    stat: "15,000 DH",
    statLabel: "ثمن الكاروسري",
    desc: "الرمل والغبار والشرقي كيخدشو الطلاء كل يوم. كتغسل الطوموبيل وتكتشف خدوش جداد. الكاروسري غالي بزاف وكيخصو أيام. طوموبيلتك كتخسر من قيمتها بلا ما تدري.",
    href: "/products/nano-ceramic-coating-spray",
    cta: "شوف الحل — سبراي السيراميك نانو",
  },
  {
    icon: "🚨",
    title: "سرقة الطوموبيلات +12%",
    stat: "+12%",
    statLabel: "هاد العام فالمغرب",
    desc: "كازا وحدها 38% ديال السرقات. العصابات كيستعملو أجهزة تشويش إلكترونية كيحلو الأبواب بلا ما تحس. الآلارم ما كيصلحش — اللص كيفوت قبل ما توصل.",
    href: "/products/gps-tracker-4g-anti-theft",
    cta: "شوف الحل — جهاز GPS 4G",
  },
];

const HOME_FAQS = [
  {
    q: "واش الدفع عند الاستلام فعلا؟ ما كنخلص حتى شي حاجة مسبقا؟",
    a: "إيه، الدفع عند الاستلام فقط. ما كاينش أي دفع مسبق. كتستلم السلعة، كتأكد منها، عاد كتخلص الليفرور. بلا أي مخاطرة عليك.",
  },
  {
    q: "شحال كياخد التوصيل؟",
    a: "بعد التأكيد الهاتفي، التوصيل كياخد 1-2 أيام للمدن الكبرى (كازا، الرباط، مراكش، طنجة، أكادير، فاس) و 2-5 أيام لباقي المدن. كنتاصلو بيك قبل التسليم.",
  },
  {
    q: "واش الضمان 30 يوم حقيقي؟",
    a: "إيه، ضمان 30 يوم كامل. إلا وصلك المنتج فيه أي عيب — نبدلوه فورا بلا سؤال وبلا تعقيد. رضا الزبون هو الأساس ديالنا.",
  },
  {
    q: "واش المنتجات كتناسب طوموبيلتي؟",
    a: "إيه، المنتجات ديالنا عالمية ومصممة باش تناسب 95% من السيارات: Dacia، Renault، Hyundai، Toyota، Volkswagen، BMW... كل الماركات.",
  },
  {
    q: "كيفاش كنأكد الطلب؟",
    a: "بعد ما تعمر الاسم ورقم الهاتف، فريقنا كيتاصل بيك خلال 24 ساعة باش يأكد العنوان والتفاصيل. المنتج كيتوجد خصيصاً ليك ويتصيفط.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ═════════════════ HERO ═════════════════ */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-content mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-3">
                {PRODUCTS.map((p) => (
                  <div key={p.slug} className={`relative aspect-square rounded-2xl overflow-hidden bg-white/10 ${p.slug === "umbrella-sunshade-titanium" ? "col-span-2" : ""}`}>
                    <Image src={p.images[0]} alt={p.shortArabicName} fill className="object-contain p-4" sizes="(max-width: 768px) 50vw, 25vw" />
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 md:order-2">
              <span className="inline-flex items-center gap-1.5 bg-accent/20 text-accent font-arabic font-semibold text-sm px-3 py-1 rounded-full mb-4">
                <Flame className="w-3.5 h-3.5" />
                خبراء حماية الطوموبيل فالمغرب
              </span>
              <h1 className="text-3xl md:text-5xl font-arabic font-bold leading-tight mb-4">
                طوموبيلتك كتواجه 3 أعداء <span className="text-accent">كل يوم</span> — الحرارة، الخدوش، والسرقة
              </h1>
              <p className="text-white/80 font-arabic text-lg leading-relaxed mb-4">
                منتجات مختبرة ومعتمدة للمناخ المغربي — واقي الشمس تيتانيوم، سبراي السيراميك نانو، وجهاز GPS 4G. حماية متخصصة من خبراء كيفهمو طوموبيلتك.
              </p>
              <p className="text-accent font-arabic font-bold text-base mb-6">
                ابتداءً من 299 MAD — الدفع عند الاستلام. ضمان 30 يوم. +3,200 زبون.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/collections"
                  className="bg-accent hover:bg-accent/90 active:scale-[0.98] text-primary font-arabic font-bold px-7 py-3.5 rounded-cta transition-all text-base shadow-lg"
                >
                  🛒 شوف المنتجات
                </Link>
                <Link
                  href="#problems"
                  className="border-2 border-white/40 hover:border-white text-white font-arabic px-6 py-3.5 rounded-cta transition-colors text-base"
                >
                  واش طوموبيلتك فخطر؟
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════ TRUST STRIP ═════════════════ */}
      <TrustStrip />

      {/* ═════════════════ PROBLEM CARDS ═════════════════ */}
      <section id="problems" className="py-16 px-4">
        <div className="max-w-content mx-auto">
          <SectionHeader
            badge="3 أعداء يومية"
            title="هاد 3 مشاكل كتقتل طوموبيلتك كل يوم — وأغلب الناس ما كيديرو والو"
            subtitle="كل سائق مغربي كيعرف هاد المشاكل — الفرق هو اللي كيدير شي حاجة واللي كيخلي طوموبيلتو تتلف"
            center
          />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {PROBLEMS.map((p) => (
              <Link key={p.title} href={p.href} className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all">
                <div className="bg-urgency/5 border-b border-urgency/20 px-5 py-3 flex items-center justify-between">
                  <span className="text-3xl">{p.icon}</span>
                  <div className="text-left">
                    <p className="font-latin font-bold text-urgency text-xl leading-none">{p.stat}</p>
                    <p className="font-arabic text-urgency/70 text-xs">{p.statLabel}</p>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-arabic font-bold text-ink text-lg mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="text-muted font-arabic text-sm leading-relaxed mb-3">{p.desc}</p>
                  <span className="inline-block text-primary font-arabic text-sm font-bold group-hover:underline">{p.cta} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════ FEATURED PRODUCTS ═════════════════ */}
      <section className="py-16 px-4 bg-bg">
        <div className="max-w-content mx-auto">
          <SectionHeader
            badge="حماية الطوموبيل الكاملة"
            title="3 منتجات ذكية — حماية شاملة من الداخل والخارج"
            subtitle="كل منتج كيحل مشكلة حقيقية يومية. الثلاثة مع بعض = طوموبيلتك محمية من كل شي."
            center
          />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/collections"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-arabic font-bold px-8 py-4 rounded-cta transition-colors text-base"
            >
              شوف جميع المنتجات والعروض
            </Link>
          </div>
        </div>
      </section>

      {/* ═════════════════ BRAND AUTHORITY ═════════════════ */}
      <section className="py-16 px-4">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                badge="علاش كريمي أوطو؟"
                title="متخصصون فحماية الطوموبيل — ماشي متجر عادي"
                subtitle="ما كنبيعوش كل شي. كنختارو غير منتجات الحماية اللي اختبرناها فالمناخ المغربي ووثقنا فيها."
              />
              <ul className="mt-6 space-y-3">
                {[
                  "تخصص واحد فقط: حماية الطوموبيل — الحرارة، الخدوش، والسرقة. ماشي متجر كل شي",
                  "مختبرة للمناخ المغربي: الرمل، الغبار، 70°C فالصيف — ماشي منتجات أوروبية ما تصلحش عندنا",
                  "الدفع عند الاستلام — ما كتخلص حتى تشوف السلعة بعينك. بلا أي مخاطرة عليك",
                  "ضمان 30 يوم كامل — إلا ما عجبكش نبدلوه فورا بلا سؤال. كنتيقو فالجودة ديالنا",
                  "تأكيد هاتفي خلال 24h — فريقنا كيتاصل بيك باش يأكد التفاصيل قبل الإرسال",
                  "+3,200 سائق مغربي اختاروها — من كازا لأكادير، من طنجة لوجدة",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 font-arabic text-ink">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {PRODUCTS.map((p) => (
                <div key={p.slug} className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-border">
                  <Image src={p.images[0]} alt={p.shortArabicName} fill className="object-contain p-3" sizes="(max-width: 768px) 33vw, 15vw" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════ SOCIAL PROOF / REVIEWS ═════════════════ */}
      <section className="py-16 px-4 bg-bg">
        <div className="max-w-content mx-auto">
          <SectionHeader
            badge="آراء الزبناء"
            title="ماذا قال +3,200 مغربي اللي جرّبو منتجاتنا"
            subtitle="نتايج حقيقية من زبناء حقيقيين — من كازا لأكادير، من طنجة لوجدة"
            center
          />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <ReviewCard
              text="والله فرق الليل والنهار! قبل، الفولون كان كيحرق يدي كل يوم. دابا كنركب عادي حتى فعز الضهر. ندمت ما شريتوش بكري — 3 ثواني تنشرو وصافي."
              name="يوسف م."
              city="مراكش"
              product="واقي الشمس المظلة"
              date="منذ 3 أيام"
            />
            <ReviewCard
              text="كنت كنمشي للكاروسري كل 3 أشهر بـ 800 درهم، يعني 3200 درهم فالعام. شريت السبراي بـ 299 ودرت طبقة — طوموبيلتي رجعات كتشعل! الماء كيزلق بوحدو والخدوش الدقيقة اختفاو."
              name="حمزة ب."
              city="الرباط"
              product="سبراي السيراميك نانو"
              date="منذ 5 أيام"
            />
            <ReviewCard
              text="واحد الصاحب ديالي تسرقاتلو طوموبيلتو فكازا وما لقاهاش. من يومها شريت GPS وركبتوه. دابا كنعرف فين طوموبيلتي 24/7 — راحة البال ما عندها ثمن."
              name="محمد ع."
              city="كازابلانكا"
              product="جهاز GPS ضد السرقة"
              date="منذ أسبوع"
            />
            <ReviewCard
              text="التابلو ديالي كان بادي يتشقق بزاف. من يوم حطيت واقي الشمس — وقف التلف تماماً. فـ 3 ثواني كيتحط وفثانية كيتطوى. جودة عالية."
              name="فاطمة الزهراء"
              city="كازابلانكا"
              product="واقي الشمس المظلة"
              date="منذ 4 أيام"
            />
            <ReviewCard
              text="شريت الباكاج كامل — الثلاثة مع بعض بـ 649 بدل 897. وفرت 248 درهم والطوموبيل دابا محمية من كل شي. أحسن استثمار درتو هاد العام."
              name="سعيد ل."
              city="أكادير"
              product="الحماية الكاملة — 3 منتجات"
              date="منذ أسبوع"
            />
            <ReviewCard
              text="الولد كياخذ الطوموبيل — كنراقبو من التطبيق وكنعرف فين كيمشي. إلا تحرك بلا إذني كيجيني تنبيه فوري. حل ذكي لراحة بال الوالدين."
              name="كريم ش."
              city="طنجة"
              product="جهاز GPS ضد السرقة"
              date="منذ 6 أيام"
            />
          </div>
        </div>
      </section>

      {/* ═════════════════ BUNDLE / AOV SECTION ═════════════════ */}
      <section className="py-16 px-4">
        <div className="max-w-content mx-auto">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-white">
            <div className="text-center mb-8">
              <span className="inline-block bg-accent/20 text-accent font-arabic font-bold text-sm px-3 py-1 rounded-full mb-3">
                عرض الحماية الكاملة
              </span>
              <h2 className="text-2xl md:text-3xl font-arabic font-bold mb-3">
                اختار مستوى الحماية ديال طوموبيلتك
              </h2>
              <p className="text-white/80 font-arabic text-base max-w-xl mx-auto">
                كل ما زدتي منتج، كل ما وفرتي أكثر — والحماية كتولي شاملة. اختار العرض اللي يناسبك.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-8 text-center">
              <div className="bg-white/10 rounded-xl p-5">
                <p className="font-arabic text-white/80 text-sm mb-1">منتج واحد</p>
                <p className="font-arabic font-bold text-accent text-2xl">299 MAD</p>
                <p className="font-arabic text-white/60 text-xs mt-1">ابدأ بالحماية الأساسية</p>
              </div>
              <div className="bg-accent/20 border-2 border-accent rounded-xl p-5 relative">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-xs text-white font-arabic font-bold bg-accent px-3 py-0.5 rounded-full">الأكثر مبيعاً</span>
                <p className="font-arabic text-white/80 text-sm mb-1 mt-1">منتجين — حماية مزدوجة</p>
                <p className="font-arabic font-bold text-accent text-2xl">449 MAD</p>
                <p className="font-arabic text-white/80 text-sm">وفر 149 MAD</p>
              </div>
              <div className="bg-white/10 rounded-xl p-5 relative">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-xs text-white font-arabic font-bold bg-success px-3 py-0.5 rounded-full">أعلى توفير</span>
                <p className="font-arabic text-white/80 text-sm mb-1 mt-1">3 منتجات — الحماية الكاملة</p>
                <p className="font-arabic font-bold text-accent text-2xl">649 MAD</p>
                <p className="font-arabic text-success text-sm font-semibold">وفر 248 MAD</p>
              </div>
            </div>
            <div className="text-center">
              <Link
                href="/collections"
                className="inline-block bg-accent hover:bg-accent/90 active:scale-[0.98] text-primary font-arabic font-bold px-8 py-4 rounded-cta transition-all text-base shadow-lg"
              >
                اختار عرضك دابا — الدفع عند الاستلام
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════ HOW COD WORKS ═════════════════ */}
      <section className="py-16 px-4 bg-bg">
        <div className="max-w-content mx-auto">
          <SectionHeader
            badge="بسيط وآمن"
            title="4 خطوات فقط — طلبية سهلة بالدفع عند الاستلام"
            subtitle="ما كاينش دفع مسبق. ما كاينش تعقيد. غير 4 خطوات وطوموبيلتك محمية."
            center
          />
          <div className="grid md:grid-cols-4 gap-6 mt-10">
            {[
              { n: "1", icon: "🛒", label: "اختار المنتج والعرض", sub: "منتج واحد أو الباكاج الكامل" },
              { n: "2", icon: "📱", label: "عمر الاسم ورقم الهاتف", sub: "30 ثانية فقط — بلا كارطة بانكير" },
              { n: "3", icon: "📞", label: "نتاصلو بيك للتأكيد", sub: "فريقنا كيأكد التفاصيل خلال 24h" },
              { n: "4", icon: "📦", label: "تستلم وتخلص الليفرور", sub: "الدفع عند الاستلام فقط" },
            ].map((step) => (
              <div key={step.n} className="text-center bg-surface border border-border rounded-2xl p-5">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-accent font-bold text-lg mx-auto mb-3">
                  {step.n}
                </div>
                <div className="text-3xl mb-2">{step.icon}</div>
                <p className="font-arabic font-bold text-ink text-sm mb-1">{step.label}</p>
                <p className="font-arabic text-muted text-xs">{step.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════ FAQ ═════════════════ */}
      <section className="py-16 px-4">
        <div className="max-w-content mx-auto max-w-2xl">
          <SectionHeader badge="الأسئلة الشائعة" title="عندك سؤال؟ — الجواب هنا" center />
          <div className="mt-8">
            <FAQAccordion faqs={HOME_FAQS} />
          </div>
        </div>
      </section>

      {/* ═════════════════ FINAL CTA ═════════════════ */}
      <section className="py-16 px-4 bg-primary text-white text-center">
        <div className="max-w-content mx-auto">
          <h2 className="text-3xl md:text-4xl font-arabic font-bold mb-4">
            كل يوم كتأخر فيه — طوموبيلتك <span className="text-accent">كتخسر</span>
          </h2>
          <p className="text-white/80 font-arabic text-lg mb-4 max-w-2xl mx-auto leading-relaxed">
            الحرارة كتشقق التابلو. الغبار كيخدش الطلاء. واللصوص ما كينتظروش.
            <br />
            <strong className="text-white">احمي طوموبيلتك دابا</strong> — الدفع عند الاستلام فقط. ضمان 30 يوم. توصيل 24-72h.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/collections"
              className="inline-block bg-accent hover:bg-accent/90 active:scale-[0.98] text-primary font-arabic font-bold px-8 py-4 rounded-cta transition-all text-base shadow-lg"
            >
              🛒 احمي طوموبيلتك دابا
            </Link>
          </div>
          <p className="text-white/50 font-arabic text-sm mt-4">
            +3,200 سائق مغربي اختاروها هاد الشهر — واش غادي تبقى تنتظر؟
          </p>
        </div>
      </section>
    </>
  );
}
