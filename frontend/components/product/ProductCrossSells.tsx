"use client";

import { ShoppingCart } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import type { Product } from "@/data/products";
import { useCartStore } from "@/stores/cart-store";
import { generateEventId } from "@/lib/tracking/ids";
import { trackAddToCart } from "@/lib/tracking/events";

// Emotional pitch for each cross-sell product depending on which main product page it appears on
const CROSS_SELL_COPY: Record<
  string,
  Record<string, { headline: string; hook: string; body: string; emoji: string }>
> = {
  // On vacuum page
  "cyclone-vacuum-15000pa": {
    "leather-seat-organizer": {
      emoji: "🗂️",
      headline: "نقية + منظمة = داخلية كاملة",
      hook: "المكنسة حلت نصف المشكل",
      body: "الداخلية النقية كتبان منظمة — لكن التيليفون واش ما زال كيطيح بين الكراسي؟ المنظم يسد هاد الفراغ بلا أدوات، خلال دقيقة واحدة فقط.",
    },
    "digital-tire-inflator-150psi": {
      emoji: "🛞",
      headline: "الاهتمام بطوموبيلك ما يوقفش على الداخلية",
      hook: "كن جاهزاً لكل موقف فالطريق",
      body: "رويضة مفشوشة فالطريق السريع أو فالليل — بلا station قريبة، بلا مساعدة. المنفاخ الرقمي 150 PSI: حل طوارئ حقيقي خاصو يكون فكل طوموبيل.",
    },
  },
  // On organizer page
  "leather-seat-organizer": {
    "cyclone-vacuum-15000pa": {
      emoji: "🧹",
      headline: "داخلية منظمة + نقية = طوموبيل على مستوى",
      hook: "المنظم رتب كل شي",
      body: "الآن وقت تمسح آخر حبة رمل وغبرة. المكنسة سيكلون بمحرك نحاس خالص وفلتر HEPA تكمل الصورة — داخلية لا فوضى ولا وسخ.",
    },
    "digital-tire-inflator-150psi": {
      emoji: "🛞",
      headline: "الطوموبيل الجاهزة هي اللي عندها حل لكل موقف",
      hook: "من الفوضى داخل لحدث الطريق خارج",
      body: "رتبتي الداخلية — دابا خلي خروجك من البيت بلا قلق. المنفاخ الرقمي 150 PSI يضمن لك ضغط صحيح وحل فوري للرويضة المفشوشة في أصعب المواقف.",
    },
  },
  // On inflator page
  "digital-tire-inflator-150psi": {
    "cyclone-vacuum-15000pa": {
      emoji: "🧹",
      headline: "جاهز للطريق خارج — نقي من الداخل كذلك",
      hook: "الطوموبيل الكاملة هي اللي مجهزة في كل شي",
      body: "المنفاخ حل مشكلة الطوارئ فالطريق — والمكنسة سيكلون تحافظ على قيمة طوموبيلك كل يوم. داخلية نقية = طوموبيل تفخر بيها.",
    },
    "leather-seat-organizer": {
      emoji: "🗂️",
      headline: "لا رويضة مفشوشة، لا تيليفون كيطيح — راحة البال الحقيقية",
      hook: "طوموبيل مجهزة كاملة لكل موقف",
      body: "المنفاخ فالصندوق للطوارئ — والمنظم يحافظ على نظام الداخلية كل يوم. لا فوضى بين الكراسي، لا قلق فالطريق.",
    },
  },
};

interface ProductCrossSellsProps {
  currentProduct: Product;
}

export default function ProductCrossSells({ currentProduct }: ProductCrossSellsProps) {
  const { addItem, openCart } = useCartStore();

  // Get 2 cross-sell products (all products except current)
  const crossSells = PRODUCTS.filter((p) => p.slug !== currentProduct.slug);

  function handleAddToCart(crossSell: Product) {
    const eventId = generateEventId();
    addItem({
      productId: crossSell.id,
      slug: crossSell.slug,
      nameAr: crossSell.arabicName,
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
            {/* Image — alternating sides */}
            <div className={imageLeft ? "md:order-1" : "md:order-2"}>
              {/* Replace with real product image before launch */}
              <div className="img-placeholder w-full aspect-[4/3] rounded-2xl">
                <div className="text-center">
                  <div className="text-5xl mb-2">{copy.emoji}</div>
                  <p className="text-white/60 font-arabic text-xs">{crossSell.shortArabicName}</p>
                </div>
              </div>
            </div>

            {/* Copy + CTA */}
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

              {/* Key proof bullets */}
              <ul className="flex flex-col gap-2 mb-6">
                {crossSell.proofBullets.slice(0, 3).map((b) => (
                  <li key={b} className="flex items-start gap-2 font-arabic text-ink text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 mt-1.5" />
                    {b}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleAddToCart(crossSell)}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-arabic font-bold px-6 py-3.5 rounded-cta transition-colors shadow-md"
              >
                <ShoppingCart className="w-4 h-4" />
                زيد للسلة — 299 MAD
              </button>
              <p className="text-xs text-muted font-arabic mt-2">
                الدفع عند الاستلام | ضمان 30 يوم
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
