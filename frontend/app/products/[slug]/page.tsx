import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle, ShieldCheck, Truck, Award, Beaker, Star, AlertTriangle, Users, Clock } from "lucide-react";
import { PRODUCTS, getProductBySlug } from "@/data/products";
import OfferSelector from "@/components/product/OfferSelector";
import ProductMediaGallery from "@/components/product/ProductMediaGallery";
import ProductCrossSells from "@/components/product/ProductCrossSells";
import StickyCTA from "@/components/product/StickyCTA";
import StickyMobileCTA from "@/components/product/StickyMobileCTA";
import ProductViewTracker from "@/components/tracking/ProductViewTracker";
import SectionHeader from "@/components/ui/SectionHeader";
import FAQAccordion from "@/components/ui/FAQAccordion";
import ReviewCard from "@/components/ui/ReviewCard";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.shortArabicName} — كريمي أوطو | خبراء حماية الطوموبيل`,
    description: product.promise,
  };
}

const PRODUCT_REVIEWS: Record<string, { text: string; name: string; city: string; date: string }[]> = {
  "umbrella-sunshade-titanium": [
    { text: "والله فرق كبير! قبل كان الفولون كيحرق يدي حتى ما نقدرش نسوق. دابا كنحط الواقي ونمشي — نرجع نلقى الداخلية باردة. 3 ثواني تنشرو وصافي. أحسن حاجة شريتها لطوموبيلتي.", name: "يوسف م.", city: "مراكش", date: "منذ 3 أيام" },
    { text: "التابلو ديالي كان بادي يتشقق بزاف من الشمس — خصوصاً فالصيف. من يوم حطيت الواقي وقف التلف تماماً. كنت متخوفة من الجودة ولكن النسيج ديال التيتانيوم حقيقي وثقيل ومتين.", name: "فاطمة الزهراء ب.", city: "كازابلانكا", date: "منذ 5 أيام" },
    { text: "عندي طوموبيل سوداء وكل صيف الحرارة كانت كتكون رهيبة. من يوم شريت هاد الواقي الفرق واضح — الكليماتيزور ما بقاش كيخدم غير عليه. كنوفر حتى البنزين دابا!", name: "كريم ش.", city: "أكادير", date: "منذ أسبوع" },
  ],
  "nano-ceramic-coating-spray": [
    { text: "كنت كنمشي للكاروسري كل 3 أشهر بـ 800 درهم — يعني 3200 فالعام! شريت السبراي ودرت طبقة واحدة. طوموبيلتي رجعات كتشعل والخدوش الدقيقة اختفاو. الماء كيزلق بوحدو — هيدروفوبي حقيقي.", name: "حمزة ت.", city: "الرباط", date: "منذ 4 أيام" },
    { text: "كنت شاك فهاد المنتج بصح جربت. والنتيجة؟ الطلاء رجع كيلمع بحال نهار شريت الطوموبيل. وأهم حاجة: بعد شهرين ونص ما زال الأثر باقي — الماء كيتكور ويطيح بوحدو.", name: "سعيد ل.", city: "أكادير", date: "منذ 6 أيام" },
    { text: "بغيت نبيع طوموبيلتي وكانت فيها خدوش دقيقة بزاف. درت طبقة سيراميك ورجع البريق — بعتها بثمن أحسن مما توقعت. 299 درهم وفرات ليا آلاف.", name: "نادية ق.", city: "وجدة", date: "منذ أسبوع" },
  ],
  "gps-tracker-4g-anti-theft": [
    { text: "واحد الصاحب ديالي تسرقاتلو طوموبيلتو فدرب السلطان وما لقاهاش. من يومها شريت GPS وركبتوه وراء التابلو. دابا كنعرف فين طوموبيلتي 24/7 — راحة البال ما عندها ثمن.", name: "محمد ع.", city: "كازابلانكا", date: "منذ 5 أيام" },
    { text: "الولد كياخذ الطوموبيل فالليل وكنت ديما خايف. دابا كنراقبو من التطبيق — كنعرف فين كيمشي وفوقاش. وإلا تحرك بلا إذني كيجيني تنبيه فوري. حل ذكي!", name: "كريم ش.", city: "طنجة", date: "منذ 3 أيام" },
    { text: "ركبت الجهاز عند واحد الكهربائي بـ 50 درهم فـ 15 دقيقة. التطبيق سهل ومجاني — ما كاينش اشتراك شهري. غير شريحة هاتف عادية وصافي. أحسن استثمار للأمان.", name: "عبد الله ح.", city: "القنيطرة", date: "منذ أسبوع" },
  ],
};

function AlternatingSection({
  index,
  imagePlaceholderLabel,
  imagePlaceholderIcon,
  children,
}: {
  index: number;
  imagePlaceholderLabel: string;
  imagePlaceholderIcon: string;
  children: React.ReactNode;
}) {
  const imageLeft = index % 2 === 0;
  return (
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <div className={imageLeft ? "md:order-2" : "md:order-1"}>
        <div className="img-placeholder w-full aspect-[4/3] rounded-2xl">
          <div className="text-center">
            <div className="text-5xl mb-2">{imagePlaceholderIcon}</div>
            <p className="text-white/60 font-arabic text-xs">{imagePlaceholderLabel}</p>
          </div>
        </div>
      </div>
      <div className={imageLeft ? "md:order-1" : "md:order-2"}>{children}</div>
    </div>
  );
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const reviews = PRODUCT_REVIEWS[product.slug] ?? [];

  return (
    <>
      <ProductViewTracker
        product={{
          slug: product.slug,
          arabicName: product.arabicName,
          price: product.offerLadder[0]?.price ?? 299,
        }}
      />
      {/* ═══════════════ ABOVE THE FOLD ═══════════════ */}
      <section id="offer-section" className="py-8 md:py-12 px-4">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-start min-w-0">
            <div className="min-w-0">
              <ProductMediaGallery images={product.images} arabicName={product.arabicName} />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block bg-primary text-white font-arabic font-semibold text-xs px-3 py-1 rounded-full">
                  اختيار كريمي أوطو
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-arabic text-success font-semibold">
                  <CheckCircle className="w-3 h-3" />
                  فالمخزون
                </span>
              </div>
              <h1 className="font-arabic font-bold text-2xl md:text-3xl text-ink leading-snug mb-2 whitespace-normal break-words">
                {product.arabicName}
              </h1>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-accent text-lg">★★★★★</span>
                <span className="font-latin text-muted text-sm">4.8/5</span>
                <span className="text-border">|</span>
                <span className="text-xs text-muted font-arabic">+1,200 مبيعة</span>
              </div>

              {/* Emotional hook — quote card */}
              <div className="relative bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/15 rounded-2xl px-5 py-4 mb-4">
                <span className="absolute -top-3 right-4 text-4xl text-accent/30 leading-none font-serif">&ldquo;</span>
                <p className="font-arabic text-ink font-semibold text-[15px] leading-relaxed whitespace-normal break-words">
                  {product.emotionalHook}
                </p>
              </div>

              <p className="font-arabic text-muted text-sm leading-relaxed mb-5 whitespace-normal break-words">
                {product.subHeadline}
              </p>

              <OfferSelector product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 1 — PAIN ═══════════════ */}
      <section className="py-14 px-4 bg-bg">
        <div className="max-w-content mx-auto">
          <AlternatingSection index={0} imagePlaceholderLabel="المشكل الحقيقي" imagePlaceholderIcon="😤">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-urgency/10 text-urgency font-arabic font-bold text-xs px-3 py-1 rounded-full mb-3">
                <AlertTriangle className="w-3 h-3" />
                المشكل اللي كيكلفك فلوس كل يوم
              </div>
              <h2 className="font-arabic font-bold text-2xl text-ink leading-snug mb-3">{product.shortHeadline}</h2>
              <p className="font-arabic text-muted text-base leading-relaxed mb-4">{product.pain}</p>
              <div className="bg-urgency/5 border border-urgency/20 rounded-xl p-4">
                <p className="font-arabic font-semibold text-urgency text-sm mb-2">مواقف كل سائق مغربي كيعرفها:</p>
                <ul className="space-y-2">
                  {product.scenarios.map((s) => (
                    <li key={s} className="flex items-start gap-2 font-arabic text-ink text-sm leading-relaxed">
                      <span className="text-urgency flex-shrink-0 mt-0.5">▸</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AlternatingSection>
        </div>
      </section>

      {/* ═══════════════ SECTION 2 — SOLUTION / DEMO ═══════════════ */}
      <section className="py-14 px-4">
        <div className="max-w-content mx-auto">
          <AlternatingSection index={1} imagePlaceholderLabel="الحل فالاستعمال" imagePlaceholderIcon="✅">
            <div>
              <SectionHeader badge="الحل" title="كيفاش كيخدم — بسيط وفعال" subtitle="ما خاصكش تكون خبير. النتيجة من أول استعمال." />
              <ul className="mt-5 space-y-3">
                {product.demoPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 font-arabic text-ink">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 bg-success/5 border border-success/20 rounded-xl p-4">
                <p className="font-arabic text-success font-bold text-sm">النتيجة:</p>
                <p className="font-arabic text-ink text-sm leading-relaxed mt-1">{product.promise}</p>
              </div>
            </div>
          </AlternatingSection>
        </div>
      </section>

      {/* ═══════════════ SECTION 3 — SCIENCE & MATERIALS ═══════════════ */}
      <section className="py-14 px-4 bg-bg">
        <div className="max-w-content mx-auto">
          <AlternatingSection index={2} imagePlaceholderLabel="تفاصيل المواد والتقنية" imagePlaceholderIcon="🔬">
            <div>
              <SectionHeader
                badge="العلم والمواد"
                title="علاش هاد المنتج تفرق — المواد اللي ما كتلقاهاش فأي مكان آخر"
                subtitle="الفرق بين منتج يدوم سنين ومنتج يتلف فشهر هو فالمواد. هنا كنشرحو بالضبط شنو فيه وعلاش."
              />
              <div className="mt-6 space-y-4">
                {product.materials.map((mat) => (
                  <div key={mat.name} className="bg-surface border border-border rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Beaker className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-arabic font-bold text-ink text-sm mb-1">{mat.name}</p>
                        <p className="font-arabic text-muted text-sm leading-relaxed">{mat.benefit}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
                <p className="font-arabic font-bold text-primary text-sm mb-2">الحقائق العلمية:</p>
                <ul className="space-y-2">
                  {product.sciencePoints.map((point) => (
                    <li key={point} className="flex items-start gap-2 font-arabic text-ink text-sm leading-relaxed">
                      <Star className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-1" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AlternatingSection>
        </div>
      </section>

      {/* ═══════════════ SECTION 4 — SPECS + PROOF ═══════════════ */}
      <section className="py-14 px-4">
        <div className="max-w-content mx-auto">
          <AlternatingSection index={3} imagePlaceholderLabel="مواصفات تقنية" imagePlaceholderIcon="🔩">
            <div>
              <SectionHeader badge="المواصفات التقنية" title="شنو فيه المنتج بالضبط — بالتفصيل" />
              <ul className="mt-5 space-y-2">
                {product.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-3 font-arabic text-ink text-sm">
                    <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                    {spec}
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-4 border-t border-border">
                <p className="font-arabic font-bold text-primary text-sm mb-3">المزايا اللي كتفرق:</p>
                <ul className="space-y-2">
                  {product.proofBullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 font-arabic text-ink text-sm">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AlternatingSection>
        </div>
      </section>

      {/* ═══════════════ SECTION 5 — WHY PREMIUM ═══════════════ */}
      <section className="py-14 px-4 bg-bg">
        <div className="max-w-content mx-auto">
          <AlternatingSection index={4} imagePlaceholderLabel="الجودة المختارة" imagePlaceholderIcon="⭐">
            <div>
              <SectionHeader badge="علاش الثمن مبرر" title="ماشي غالي — هادي استثمار فطوموبيلتك" subtitle="المنتجات الرخيصة كتتلف فأسبوع وكتكلفك أكثر على المدى الطويل. هنا كتشري جودة كتدوم." />
              <ul className="mt-5 space-y-3">
                {product.whyPremiumPoints.map((p) => (
                  <li key={p} className="flex items-start gap-3 font-arabic text-ink text-sm leading-relaxed">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </AlternatingSection>
        </div>
      </section>

      {/* ═══════════════ SECTION 6 — CERTIFICATIONS & AUTHORITY ═══════════════ */}
      <section className="py-14 px-4">
        <div className="max-w-content mx-auto">
          <AlternatingSection index={5} imagePlaceholderLabel="شهادات الجودة" imagePlaceholderIcon="🏆">
            <div>
              <SectionHeader
                badge="الثقة والجودة"
                title="مختبر ومعتمد — ماشي كلام فارغ"
                subtitle="ما كنبيعوش شي حاجة حتى نتحققو من جودتها ومطابقتها للمعايير الدولية."
              />
              <div className="mt-6 space-y-3">
                {product.certifications.map((cert) => (
                  <div key={cert} className="flex items-start gap-3 bg-success/5 border border-success/20 rounded-xl p-4">
                    <Award className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <p className="font-arabic text-ink text-sm leading-relaxed">{cert}</p>
                  </div>
                ))}
                <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4">
                  <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-arabic font-bold text-ink text-sm">ختم كريمي أوطو</p>
                    <p className="font-arabic text-muted text-xs mt-0.5">
                      كل منتج تحققنا منه شخصياً — جودة مختارة للاستعمال اليومي فالمناخ المغربي الصعب.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AlternatingSection>
        </div>
      </section>

      {/* ═══════════════ REVIEWS ═══════════════ */}
      <section className="py-14 px-4 bg-bg">
        <div className="max-w-content mx-auto">
          <SectionHeader
            badge="آراء الزبناء"
            title="شنو قالو الزبناء اللي جربو هاد المنتج"
            subtitle="نتايج حقيقية من سائقين مغاربة بحالك"
            center
          />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {reviews.map((r) => (
              <ReviewCard
                key={r.name}
                text={r.text}
                name={r.name}
                city={r.city}
                date={r.date}
                product={product.shortArabicName}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CROSS-SELLS ═══════════════ */}
      <section className="py-14 px-4">
        <div className="max-w-content mx-auto">
          <SectionHeader
            badge="يكملو بعضاهم"
            title="حماية واحدة ماشي كافية — كمّل الحماية ديال طوموبيلتك"
            subtitle="كل منتج كيحل مشكلة مختلفة. الثلاثة مع بعض = حماية كاملة 360°"
            center
          />
          <div className="mt-12">
            <ProductCrossSells currentProduct={product} />
          </div>
        </div>
      </section>

      {/* ═══════════════ GUARANTEE & COD ═══════════════ */}
      <section className="py-14 px-4 bg-bg">
        <div className="max-w-content mx-auto">
          <SectionHeader
            badge="بلا أي مخاطرة"
            title="3 ضمانات كتخليك تطلب براحتك"
            center
          />
          <div className="grid md:grid-cols-3 gap-5 mt-8">
            <div className="bg-success/10 border border-success/30 rounded-2xl p-6 text-center">
              <ShieldCheck className="w-8 h-8 text-success mx-auto mb-3" />
              <h3 className="font-arabic font-bold text-ink text-base mb-2">ضمان 30 يوم كامل</h3>
              <p className="font-arabic text-muted text-sm leading-relaxed">
                إلا وصلك المنتج فيه أي عيب خلال 30 يوم — نبدلوه فورا بلا سؤال ولا تعقيد. رضاك هو الأول.
              </p>
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
              <Truck className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-arabic font-bold text-ink text-base mb-2">الدفع عند الاستلام فقط</h3>
              <p className="font-arabic text-muted text-sm leading-relaxed">
                ما كتخلص حتى توصلك السلعة وتشوفها بعينك. بلا كارطة بانكير، بلا دفع مسبق — بلا أي مخاطرة عليك.
              </p>
            </div>
            <div className="bg-accent/10 border border-accent/30 rounded-2xl p-6 text-center">
              <Clock className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-arabic font-bold text-ink text-base mb-2">تأكيد هاتفي خلال 24h</h3>
              <p className="font-arabic text-muted text-sm leading-relaxed">
                فريقنا كيتاصل بيك خلال 24 ساعة باش يأكد العنوان والتفاصيل. المنتج كيتوجد خصيصاً ليك.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section className="py-12 px-4 pb-24">
        <div className="max-w-content mx-auto max-w-2xl">
          <SectionHeader badge="الأسئلة الشائعة" title="عندك سؤال؟ — الجواب هنا" center />
          <div className="mt-8">
            <FAQAccordion faqs={product.faqs} />
          </div>
        </div>
      </section>

      {/* Sticky CTAs */}
      <div className="hidden md:block">
        <StickyCTA product={product} />
      </div>
      <div className="md:hidden">
        <StickyMobileCTA product={product} />
      </div>
    </>
  );
}
