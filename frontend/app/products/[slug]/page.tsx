import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle, ShieldCheck, Truck, Award, Beaker, Star } from "lucide-react";
import { PRODUCTS, getProductBySlug } from "@/data/products";
import OfferSelector from "@/components/product/OfferSelector";
import ProductMediaGallery from "@/components/product/ProductMediaGallery";
import ProductCrossSells from "@/components/product/ProductCrossSells";
import StickyCTA from "@/components/product/StickyCTA";
import StickyMobileCTA from "@/components/product/StickyMobileCTA";
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
    title: `${product.arabicName} — كريمي أوطو`,
    description: product.promise,
  };
}

// Alternating section: odd index → image left / text right | even → text left / image right
function AlternatingSection({
  index,
  imagePlaceholderLabel,
  imagePlaceholderIcon,
  children,
}: {
  index: number; // 0-based
  imagePlaceholderLabel: string;
  imagePlaceholderIcon: string;
  children: React.ReactNode;
}) {
  const imageLeft = index % 2 === 0; // section 1 (0): image left | section 2 (1): image right | etc.
  return (
    <div className="grid md:grid-cols-2 gap-10 items-center">
      {/* Image */}
      <div className={imageLeft ? "md:order-2" : "md:order-1"}>
        {/* Replace with real product image before launch */}
        <div className="img-placeholder w-full aspect-[4/3] rounded-2xl">
          <div className="text-center">
            <div className="text-5xl mb-2">{imagePlaceholderIcon}</div>
            <p className="text-white/60 font-arabic text-xs">{imagePlaceholderLabel}</p>
          </div>
        </div>
      </div>
      {/* Text */}
      <div className={imageLeft ? "md:order-1" : "md:order-2"}>{children}</div>
    </div>
  );
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();


  return (
    <>
      {/* ═══════════════════════════════════════
          ABOVE THE FOLD — Hero + Offer Selector
          id="offer-section" → StickyCTA scrolls here
          ═══════════════════════════════════════ */}
      <section id="offer-section" className="py-8 md:py-12 px-4">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-start min-w-0">
            {/* Left on desktop: Media */}
            <div className="min-w-0">
              <ProductMediaGallery images={product.images} arabicName={product.arabicName} />
            </div>

            {/* Right on desktop: Product info */}
            <div className="min-w-0">
              <span className="inline-block bg-primary text-white font-arabic font-semibold text-xs px-3 py-1 rounded-full mb-3">
                اختيار كريمي أوطو
              </span>
              <h1 className="font-arabic font-bold text-2xl md:text-3xl text-ink leading-snug mb-2 whitespace-normal break-words">
                {product.arabicName}
              </h1>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-accent text-lg">★★★★★</span>
                <span className="font-latin text-muted text-sm">4.8/5</span>
              </div>
              {/* Emotional hook */}
              <p className="font-arabic text-primary font-semibold text-base leading-relaxed mb-2 border-r-4 border-accent pr-3 whitespace-normal break-words">
                {product.emotionalHook}
              </p>
              <p className="font-arabic text-muted text-base leading-relaxed mb-5 whitespace-normal break-words">
                {product.promise}
              </p>
              <OfferSelector product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 1 — PAIN (Image Left / Text Right)
          ═══════════════════════════════════════ */}
      <section className="py-14 px-4 bg-bg">
        <div className="max-w-content mx-auto">
          <AlternatingSection index={0} imagePlaceholderLabel="سيناريو المشكل" imagePlaceholderIcon="😤">
            <SectionHeader badge="المشكل اللي ما حد كيتكلم عليه" title={product.shortHeadline} subtitle={product.pain} />
          </AlternatingSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 — DEMO (Image Right / Text Left)
          ═══════════════════════════════════════ */}
      <section className="py-14 px-4">
        <div className="max-w-content mx-auto">
          <AlternatingSection index={1} imagePlaceholderLabel="المنتج في الاستعمال" imagePlaceholderIcon="✅">
            <SectionHeader badge="الحل" title="كيفاش كيخدم" />
            <ul className="mt-5 space-y-3">
              {product.demoPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 font-arabic text-ink">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </AlternatingSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3 — SCIENCE & MATERIALS (Image Left / Text Right)
          ═══════════════════════════════════════ */}
      <section className="py-14 px-4 bg-bg">
        <div className="max-w-content mx-auto">
          <AlternatingSection index={2} imagePlaceholderLabel="تفاصيل المواد والتقنية" imagePlaceholderIcon="🔬">
            <div>
              <SectionHeader
                badge="العلم والمواد"
                title="علاش المواد ديالنا تفرق"
                subtitle="الفرق بين منتج يدوم سنين ومنتج يتلف في شهر هو في المواد — هاد هو السر ديالنا."
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
                <p className="font-arabic font-semibold text-primary text-sm mb-2">العلم وراء الجودة:</p>
                <ul className="space-y-1.5">
                  {product.sciencePoints.map((point) => (
                    <li key={point} className="flex items-start gap-2 font-arabic text-ink text-sm">
                      <Star className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AlternatingSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4 — SPECS (Image Right / Text Left)
          ═══════════════════════════════════════ */}
      <section className="py-14 px-4">
        <div className="max-w-content mx-auto">
          <AlternatingSection index={3} imagePlaceholderLabel="مواصفات المنتج" imagePlaceholderIcon="🔩">
            <div>
              <SectionHeader badge="المواصفات" title="شنو فيه المنتج بالضبط" />
              <ul className="mt-5 space-y-2">
                {product.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-3 font-arabic text-ink text-sm">
                    <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                    {spec}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-arabic font-semibold text-muted text-sm mb-2">المزايا الأساسية:</p>
                <ul className="space-y-1.5">
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

      {/* ═══════════════════════════════════════
          SECTION 5 — WHY PREMIUM (Image Left / Text Right)
          ═══════════════════════════════════════ */}
      <section className="py-14 px-4 bg-bg">
        <div className="max-w-content mx-auto">
          <AlternatingSection index={4} imagePlaceholderLabel="جودة الاختيار" imagePlaceholderIcon="⭐">
            <div>
              <SectionHeader badge="علاش الثمن مبرر" title="الثمن على راحة البال — مو على المنتج فقط" />
              <ul className="mt-5 space-y-3">
                {product.whyPremiumPoints.map((p) => (
                  <li key={p} className="flex items-start gap-3 font-arabic text-ink">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </AlternatingSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 6 — AUTHORITY & CERTIFICATIONS (Image Right / Text Left)
          ═══════════════════════════════════════ */}
      <section className="py-14 px-4">
        <div className="max-w-content mx-auto">
          <AlternatingSection index={5} imagePlaceholderLabel="شهادات الجودة" imagePlaceholderIcon="🏆">
            <div>
              <SectionHeader
                badge="الثقة والجودة"
                title="مختبر ومعتمد"
                subtitle="ما بيعناش منتج حتى تحققنا من جودته ومطابقته للمعايير الدولية."
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
                    <p className="font-arabic font-bold text-ink text-sm">اختيار كريمي أوطو</p>
                    <p className="font-arabic text-muted text-xs mt-0.5">
                      كل منتج فمجموعتنا تحققنا منه قبل الإضافة — جودة مختارة للاستعمال اليومي فالمغرب.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AlternatingSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MOROCCAN SCENARIOS
          ═══════════════════════════════════════ */}
      <section className="py-14 px-4 bg-bg">
        <div className="max-w-content mx-auto">
          <SectionHeader badge="مواقف حقيقية" title="فاش كتحتاجه فعلا — مواقف من الحياة المغربية" center />
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            {product.scenarios.map((s) => (
              <div key={s} className="bg-surface border border-border rounded-xl p-5 flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🚗</span>
                <p className="font-arabic text-ink text-sm leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          REVIEWS — PLACEHOLDER
          ═══════════════════════════════════════ */}
      {/* PLACEHOLDER REVIEWS — Replace with real customer reviews after first deliveries */}
      <section className="py-14 px-4">
        <div className="max-w-content mx-auto">
          <SectionHeader
            badge="آراء الزبناء"
            title="ماذا قالوا عن المنتج"
            subtitle="سيتم إضافة آراء وصور الزبناء بعد أول deliveries"
            center
          />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <ReviewCard
              text={`استعملت ${product.shortHeadline} وبان الفرق من اليوم الأول. جودة مزيانة وما توقعتش.`}
              name="سارة ب."
              city="أكادير"
            />
            <ReviewCard
              text="توصيل سريع والمنتج مطابق للصور. خدمة من كريمي أوطو ممتازة."
              name="كريم أ."
              city="فاس"
            />
            <ReviewCard
              text="الضمان 30 يوم أكد ليا الشراء. كنت خايف من الجودة ولكن المنتج فاق توقعاتي."
              name="هدى م."
              city="طنجة"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CROSS-SELLS — 2 complementary products
          ═══════════════════════════════════════ */}
      <section className="py-14 px-4 bg-bg">
        <div className="max-w-content mx-auto">
          <SectionHeader
            badge="يكملو بعضاهم"
            title="طوموبيل كاملة — لا نقص فأي حاجة"
            subtitle="كل منتج من مجموعة كريمي أوطو حل مشكلة حقيقية — شوف شنو كيكمل تجربتك"
            center
          />
          <div className="mt-12">
            <ProductCrossSells currentProduct={product} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          GUARANTEE & COD — 30-Day Warranty
          ═══════════════════════════════════════ */}
      <section className="py-14 px-4">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-success/10 border border-success/30 rounded-2xl p-5">
              <ShieldCheck className="w-7 h-7 text-success mb-3" />
              <h3 className="font-arabic font-bold text-ink text-base mb-1">ضمان 30 يوم كامل</h3>
              <p className="font-arabic text-muted text-sm leading-relaxed">
                إلا وصلك المنتج فيه أي عيب خلال 30 يوم — نبدلوه فورا بدون سؤال ولا تعقيدات.
              </p>
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
              <Truck className="w-7 h-7 text-primary mb-3" />
              <h3 className="font-arabic font-bold text-ink text-base mb-1">الدفع عند الاستلام</h3>
              <p className="font-arabic text-muted text-sm leading-relaxed">
                ما كتخلص حتى توصلك commande وتشوفها بعينك. غادي نتاصلو بك قبل الإرسال.
              </p>
            </div>
            <div className="bg-accent/10 border border-accent/30 rounded-2xl p-5">
              <Award className="w-7 h-7 text-accent mb-3" />
              <h3 className="font-arabic font-bold text-ink text-base mb-1">مختار ومعتمد</h3>
              <p className="font-arabic text-muted text-sm leading-relaxed">
                CE/RoHS certified — مواد مختارة ومختبرة للاستعمال اليومي فالمغرب.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ
          ═══════════════════════════════════════ */}
      <section className="py-12 px-4 bg-bg pb-24">
        <div className="max-w-content mx-auto max-w-2xl">
          <SectionHeader badge="الأسئلة" title="عندك سؤال؟" center />
          <div className="mt-8">
            <FAQAccordion faqs={product.faqs} />
          </div>
        </div>
      </section>

      {/* Sticky CTA — Desktop */}
      <div className="hidden md:block">
        <StickyCTA product={product} />
      </div>

      {/* Sticky CTA — Mobile */}
      <div className="md:hidden">
        <StickyMobileCTA product={product} />
      </div>
    </>
  );
}
