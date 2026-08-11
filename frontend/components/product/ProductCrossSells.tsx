"use client";

import { ShoppingCart, CheckCircle } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import type { Product } from "@/data/products";
import { useCartStore } from "@/stores/cart-store";
import { generateEventId } from "@/lib/tracking/ids";
import { trackAddToCart } from "@/lib/tracking/events";

const CROSS_SELL_COPY: Record<
  string,
  Record<string, { headline: string; hook: string; body: string; emoji: string }>
> = {
  "umbrella-sunshade-titanium": {
    "nano-ceramic-coating-spray": {
      emoji: "✨",
      headline: "حميتي الداخلية — دابا احمي الخارجية",
      hook: "حماية 360° لطوموبيلتك",
      body: "الواقي كيحمي التابلو والداخلية من الحرارة. والسبراي السيراميك؟ كيحمي الطلاء من الخدوش اللي كيديرها الغبار والرمل كل يوم. طبقة SiO2 نانو كتخلق درع شفاف كيدوم 6 أشهر — الثنائي الذكي اللي كيحافظ على قيمة طوموبيلتك.",
    },
    "gps-tracker-4g-anti-theft": {
      emoji: "📡",
      headline: "حميتي الداخلية — دابا احمي الطوموبيل كلها من السرقة",
      hook: "حتى أحسن طوموبيل ممكن تتسرق",
      body: "الواقي كيحمي من الحرارة — بصح واش الحرارة هي الخطر الوحيد؟ سرقة الطوموبيلات فالمغرب زادت +12% هاد العام. جهاز GPS 4G صغير بحال القداحة كيعطيك الموقع الدقيق 24/7 على تيليفونك. إلا تحركات بلا إذنك — كيجيك تنبيه فوري.",
    },
  },
  "nano-ceramic-coating-spray": {
    "umbrella-sunshade-titanium": {
      emoji: "☀️",
      headline: "حميتي الطلاء — دابا احمي الداخلية من الحرارة",
      hook: "الخدوش حلِّتيها، بقات الحرارة",
      body: "السيراميك كيحمي الطلاء من برا — بصح الداخلية؟ كل يوم 70°C داخل الطوموبيل! الفولون كيحرق يديك والتابلو كيتشقق. واقي الشمس بطبقة تيتانيوم كيعكس 99% من الأشعة — كيخفض الحرارة بـ 30 درجة فـ 3 ثواني.",
    },
    "gps-tracker-4g-anti-theft": {
      emoji: "📡",
      headline: "طوموبيل بريقة وجديدة — تستاهل حماية من السرقة",
      hook: "كل ما طوموبيلتك شعلات، كل ما العين عليها",
      body: "السيراميك خلاها كتشعل بحال الجديدة — وهادشي كيجلب العين عليها أكثر. جهاز GPS 4G مخبي فمكان آمن كيخليك تراقبها 24/7 من تيليفونك. إلا تحرك بلا إذنك — تنبيه فوري + الموقع الدقيق للبوليس.",
    },
  },
  "gps-tracker-4g-anti-theft": {
    "umbrella-sunshade-titanium": {
      emoji: "☀️",
      headline: "حميتيها من السرقة — دابا احميها من الحرارة",
      hook: "السرقة ماشي الخطر الوحيد",
      body: "GPS كيحمي من اللصوص — بصح الشمس عدو يومي آخر! 70°C داخل الطوموبيل كيشقق التابلو ويبهت الجلد ويحرق الفولون. واقي الشمس تيتانيوم كيخفض الحرارة بـ 30°C فثواني — وداعاً للفولون اللي كيحرق يديك.",
    },
    "nano-ceramic-coating-spray": {
      emoji: "✨",
      headline: "محمية من السرقة — دابا احمي الطلاء من الخدوش",
      hook: "اللصوص ماشي الوحيدين اللي كيضرّو طوموبيلتك",
      body: "GPS كيراقب الطوموبيل 24/7 — بصح الغبار والرمل كيخدشو الطلاء كل يوم بلا ما تحس. سبراي السيراميك نانو SiO2 كيخلق طبقة 9H فوق الطلاء — أصلب من الطلاء الأصلي. 20 دقيقة ديال الرش = 6 أشهر ديال الحماية.",
    },
  },
};

interface ProductCrossSellsProps {
  currentProduct: Product;
}

export default function ProductCrossSells({ currentProduct }: ProductCrossSellsProps) {
  const { addItem, openCart } = useCartStore();

  const crossSells = PRODUCTS.filter((p) => p.slug !== currentProduct.slug);

  function handleAddToCart(crossSell: Product) {
    const eventId = generateEventId();
    addItem({
      productId: crossSell.id,
      slug: crossSell.slug,
      nameAr: crossSell.shortArabicName,
      quantity: 1,
      bundlePieces: 1,
      unitOfferPrice: 299,
      totalPrice: 299,
      source: "cart_cross_sell",
      addToCartEventId: eventId,
    });
    trackAddToCart({ slug: crossSell.slug, price: 299, quantity: 1 }, eventId);
    openCart();
  }

  return (
    <div className="flex flex-col gap-14">
      {crossSells.map((crossSell, idx) => {
        const copy =
          CROSS_SELL_COPY[currentProduct.slug]?.[crossSell.slug] ?? {
            emoji: "🚗",
            headline: crossSell.shortHeadline,
            hook: "يكمل تجربة طوموبيلك",
            body: crossSell.promise,
          };

        const imageLeft = idx % 2 === 0;

        return (
          <div
            key={crossSell.slug}
            className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            <div className={imageLeft ? "md:order-1" : "md:order-2"}>
              <div className="img-placeholder w-full aspect-[4/3] rounded-2xl">
                <div className="text-center">
                  <div className="text-5xl mb-2">{copy.emoji}</div>
                  <p className="text-white/60 font-arabic text-xs">{crossSell.shortArabicName}</p>
                </div>
              </div>
            </div>

            <div className={imageLeft ? "md:order-2" : "md:order-1"}>
              <span className="inline-block bg-accent/10 text-accent font-arabic font-semibold text-xs px-3 py-1 rounded-full mb-3">
                {copy.hook}
              </span>
              <h3 className="font-arabic font-bold text-ink text-xl md:text-2xl leading-snug mb-3">
                {copy.headline}
              </h3>
              <p className="font-arabic text-muted leading-relaxed mb-5 text-base">
                {copy.body}
              </p>

              <ul className="flex flex-col gap-2 mb-6">
                {crossSell.proofBullets.slice(0, 3).map((b) => (
                  <li key={b} className="flex items-start gap-2 font-arabic text-ink text-sm">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleAddToCart(crossSell)}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark active:scale-[0.98] text-white font-arabic font-bold px-6 py-3.5 rounded-cta transition-all shadow-lg"
              >
                <ShoppingCart className="w-4 h-4" />
                زيد للسلة — 299 MAD
              </button>
              <p className="text-xs text-muted font-arabic mt-2">
                الدفع عند الاستلام | ضمان 30 يوم | توصيل 24-72h
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
