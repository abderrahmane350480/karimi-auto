# Karimi Auto — Store Rebuild Specification

## For AI Coder: Complete Product & UX Overhaul

---

## 1. Context

This is a Moroccan Arabic COD (Cash on Delivery) dropshipping store selling car accessories. The store is built with Next.js 14, Tailwind CSS, Zustand, and the full tech stack is already in place at `frontend/`.

We are **replacing all 3 current products** with 3 new products that solve **visible, daily, urgent problems** that drive higher COD confirmation and delivery rates in Morocco.

**The core insight:** In COD Morocco, high delivery = the pain is visible, daily, and urgent. Low delivery = pain is hidden or "nice-to-have." Every product we sell must pass the test: "Between order and delivery (2-5 days), does the pain GET STRONGER or fade?"

**Language:** All customer-facing copy is in **Moroccan Darija Arabic** (not MSA). RTL layout. The store is already set up for this.

**Keep everything that already works:** layout, components, checkout flow, cart, tracking pixels, branding colors, fonts. We are changing: products data, homepage sections, and adding new urgency/scarcity tactics.

---

## 2. New Product Lineup — 3 Products

### Why These 3 Products

| # | Product | Problem It Solves | Emotion | Why High Delivery |
|---|---------|-------------------|---------|-------------------|
| 1 | واقي الشمس المظلة للزجاج الأمامي | Interior heat (45°C+, steering wheel burns hands) | Daily physical frustration | Customer is STILL burning every day while waiting for delivery |
| 2 | سبراي السيراميك نانو لحماية الطلاء | Scratches, paint degradation from sand/dust | Insecurity about car status | The scratch is STILL visible every day while waiting |
| 3 | جهاز GPS تتبع ضد السرقة 4G | Car theft (+12% YoY in Morocco) | Pure fear | Every theft news story REINFORCES the purchase decision |

These 3 form a natural ecosystem: **"حماية الطوموبيل الكاملة"** (Complete Car Protection) — heat, paint, security.

---

## 3. Sourcing Costs, Sell Prices & Profit per Product

### Moroccan Purchasing Power Context (القدرة الشرائية)

| Metric | Amount |
|--------|--------|
| Average net salary (after tax) | 4,457 MAD/month |
| SMIG (minimum wage) | 3,423 MAD/month |
| Formal sector gross average | 8,000-9,800 MAD/month |
| Average COD order value | 200-350 MAD |
| COD sweet spot (impulse buy zone) | 150-500 MAD |
| Above 500 MAD | Higher refusal risk — needs strong pain |
| Above 1,000 MAD | Push prepaid — COD too risky |

**Why 299 MAD works:** It's ~6.7% of average net salary. Expensive enough to feel valuable (customer won't throw away the order), cheap enough for impulse buying on social media. This is THE sweet spot for COD Morocco.

---

### Alibaba Sourcing Prices (verified August 2026)

#### Product 1: واقي الشمس المظلة (Umbrella Sunshade)

| Order Quantity | Price/Unit (USD) | Price/Unit (MAD ~10x) |
|----------------|------------------|----------------------|
| 10-99 pcs | $1.65-2.90 | 17-29 MAD |
| 100-999 pcs | $1.35-2.80 | 14-28 MAD |
| 1,000+ pcs | $1.16-1.70 | 12-17 MAD |
| **Recommended start (100 pcs)** | **~$1.50** | **~15 MAD** |

Weight: 400g | Shipping to Morocco: ~$2.50 = ~25 MAD | **Total landed: ~40 MAD**

Suppliers: TIYPEOR (Alibaba), Yiwu factories, Shenzhen Turui

#### Product 2: سبراي السيراميك نانو (Ceramic Coating Spray 300ml)

| Order Quantity | Price/Unit (USD) | Price/Unit (MAD ~10x) |
|----------------|------------------|----------------------|
| 50-999 pcs | $3.50-3.79 | 35-38 MAD |
| 1,000-4,999 pcs | $2.50-3.50 | 25-35 MAD |
| 5,000+ pcs | $1.02-1.50 | 10-15 MAD |
| **Recommended start (54 pcs/carton)** | **~$3.79** | **~38 MAD** |

Weight: 350g (liquid) | Shipping to Morocco: ~$3.50 = ~35 MAD | **Total landed: ~73 MAD**

Suppliers: Guangdong Nuojie (Fantastics XML), Sybon, Dongguan Hong-Yan

#### Product 3: جهاز GPS ضد السرقة 4G (Mini GPS Tracker)

| Order Quantity | Price/Unit (USD) | Price/Unit (MAD ~10x) |
|----------------|------------------|----------------------|
| 2-99 pcs | $7.50-18.00 | 75-180 MAD |
| 100-499 pcs | $7.00-13.50 | 70-135 MAD |
| 1,000+ pcs | $7.00-13.20 | 70-132 MAD |
| **Recommended start (PG07, 100 pcs)** | **~$8.00** | **~80 MAD** |

Weight: 65g | Shipping to Morocco: ~$2.00 = ~20 MAD | **Total landed: ~100 MAD**

Suppliers: Shenzhen Xing An Da ($7.70-8.80), PG07 manufacturer, Shenzhen Trackpro

**Important:** Choose a GPS with **free lifetime platform/app** (many include it). The PG07 offers 3 years free app. Avoid models requiring paid subscriptions — this kills COD conversion.

---

### Sell Price Recommendation (Calibrated for القدرة الشرائية)

**All 3 products: 299 MAD standalone**

Why not different prices per product?
- Uniform pricing simplifies the bundle system (already built in the store)
- 299 MAD is the proven Moroccan COD sweet spot
- Makes the cross-sell bundles feel fair (customer doesn't calculate which product is "worth more")
- The GPS tracker at 299 MAD feels like a STEAL (real GPS devices sell for 500-1500 MAD in Morocco)
- The sunshade at 299 feels premium (local markets sell basic ones at 50-100 MAD but they break)

---

### Profit Per Delivered Order (Unit Economics)

**Fixed costs per order (regardless of product):**

| Cost Item | Amount (MAD) |
|-----------|-------------|
| Domestic courier (Amana/Cathedis) | 35 MAD |
| COD collection fee | 10 MAD |
| Confirmation call | 5 MAD |
| Facebook/TikTok ad spend per customer | 50 MAD |
| Return cost allocation* | 23 MAD |
| **Total fixed overhead per delivered order** | **~123 MAD** |

*Return allocation: assuming 15% return rate on confirmed orders. Each return = ~60 MAD loss (round-trip shipping + wasted ad spend). Spread across delivered orders: 0.15 × 60 / 0.85 = ~11 MAD. Plus wasted ad spend on non-confirmed: adds ~12 MAD. Total ~23 MAD.*

#### Single Product (299 MAD)

| Product | Landed Cost | Fixed Overhead | Sell Price | **NET PROFIT** | **Margin** |
|---------|-------------|----------------|-----------|----------------|------------|
| واقي الشمس (Sunshade) | 40 MAD | 123 MAD | 299 MAD | **136 MAD** | **45%** |
| سبراي السيراميك (Ceramic) | 73 MAD | 123 MAD | 299 MAD | **103 MAD** | **34%** |
| جهاز GPS (Tracker) | 100 MAD | 123 MAD | 299 MAD | **76 MAD** | **25%** |

#### Duo Bundle (449 MAD) — same courier, same ad, same call

| Bundle | Total Landed | Fixed Overhead | Sell Price | **NET PROFIT** | **Margin** |
|--------|-------------|----------------|-----------|----------------|------------|
| Sunshade + Ceramic | 113 MAD | 123 MAD | 449 MAD | **213 MAD** | **47%** |
| Sunshade + GPS | 140 MAD | 123 MAD | 449 MAD | **186 MAD** | **41%** |
| Ceramic + GPS | 173 MAD | 123 MAD | 449 MAD | **153 MAD** | **34%** |

#### Trio Bundle (649 MAD) — THE MONEY MAKER

| Bundle | Total Landed | Fixed Overhead | Sell Price | **NET PROFIT** | **Margin** |
|--------|-------------|----------------|-----------|----------------|------------|
| All 3 products | 213 MAD | 123 MAD | 649 MAD | **313 MAD** | **48%** |

**Key insight:** The trio bundle at 649 MAD gives you 313 MAD profit — more than DOUBLE a single product sale, with the SAME ad spend and SAME courier cost. This is why the middle offer ("الأكثر مبيعاً") and the full kit ("أعلى توفير") are so important.

---

### Price Psychology for Moroccan COD

| Tactic | How It Works |
|--------|-------------|
| **299 = "just under 300"** | Moroccan customers see 299 as "200 and something" not "300." This psychological anchor is critical. |
| **"وفر 149 MAD" on duo** | The saving (149 MAD) is almost a full day's wages for SMIG workers. Makes the duo feel like the smart choice. |
| **"وفر 248 MAD" on trio** | 248 MAD saved = almost a week's food budget. Massive perceived value. |
| **Default to middle tier** | The OfferSelector already defaults to the middle bundle (index 1). This is correct — most customers choose what's pre-selected. |
| **GPS at 299 = "cheap insurance"** | A car is worth 50,000-300,000 MAD. Paying 299 to protect it feels like nothing. Frame it: "299 درهم = ثمن بيتزا واحدة لحماية طوموبيل ثمنها 100,000 درهم" |
| **Ceramic at 299 vs garage at 5,000+** | Price anchor against professional detailing. "احمي الطلاء ديالك بـ 299 درهم بدل 5,000 درهم فالكاروسري" |
| **Sunshade at 299 = saves AC fuel** | Frame as ROI: "الكليماتيزور كيزيد استهلاك البنزين بـ 20%. واقي الشمس كيوفر عليك البنزين كل يوم." |

---

### When to Raise Prices

| Signal | Action |
|--------|--------|
| Confirmation rate > 85% | Price is too low — test 349 MAD |
| Delivery rate > 90% | You can push higher — test bundles at 499/749 |
| Duo bundle is most popular | Good — the pricing ladder is working |
| Trio bundle is most popular | You're underpricing — raise trio to 699-749 |
| Single product dominates | Duo isn't compelling enough — increase the saving or add a bonus |

---

## 4. Pricing Structure (KEEP SAME AS CURRENT)

```typescript
export const BUNDLE_PRICES: Record<number, number> = {
  1: 299,
  2: 379,
  3: 449,
};

export const UPSELL_PRICE = 199;

export const CROSS_SELL_BUNDLE_PRICES = {
  single: 299,
  duo: 449,    // main 299 + add-on 150
  trio: 649,   // main 299 + add-on1 150 + add-on2 200
};
```

---

## 4. Complete Product Data (Replace PRODUCTS array in `data/products.ts`)

### PRODUCT 1: واقي الشمس المظلة — Umbrella Windshield Sun Shade

```typescript
{
  id: "umbrella-sunshade-titanium",
  slug: "umbrella-sunshade-titanium",
  arabicName: "واقي الشمس المظلة — ما تحرقش يديك فالفولون مرة خرى",
  shortArabicName: "واقي الشمس المظلة",
  internalName: "TitanShield Umbrella Sunshade",
  shortHeadline: "كل نهار فالصيف كتحرق يديك فالفولون — وداعاً لهادشي",
  subHeadline: "مظلة تيتانيوم تنشر فـ 3 ثواني — كتخفض الحرارة داخل الطوموبيل بـ 30 درجة وكتحمي التابلو من التشقق",
  emotionalHook:
    "كل مغربي عارف هاد اللحظة: تحل باب الطوموبيل فالصيف وتحس بحال شي فرن. الفولون كيحرق، الكرسي كيشعل، والتابلو كيتشقق. هادشي ماشي عادي — هادشي كيتلف طوموبيلتك كل يوم.",
  pain:
    "فالصيف المغربي، الحرارة داخل الطوموبيل كتوصل لـ 70 درجة! الفولون كيولي كيحرق اليدين بالحقيقة — ما تقدرش تمسكو. التابلو كيتشقق، الجلد كيتبهت، والكراسي كيولو كالنار. كل يوم كتخسر من قيمة طوموبيلتك بلا ما تدري.",
  promise:
    "واقي الشمس المظلة بطبقة تيتانيوم فضية كيعكس 99% من أشعة الشمس. كتنشرو فـ 3 ثواني بحال المظلة وكتطويه فثانية. الفولون ما يحرقش، التابلو ما يتشققش، والداخلية ديال طوموبيلتك محمية كل يوم.",
  proofBullets: [
    "طبقة تيتانيوم فضية — كتعكس 99% من الأشعة فوق البنفسجية UV",
    "كتخفض حرارة الداخلية بـ 30 درجة مئوية",
    "تصميم مظلة — تنشر فـ 3 ثواني وتطوي فثانية",
    "هيكل معدني مقوى — ما ينكسرش مع الاستعمال",
    "حجم عالمي — مناسب لـ 95% من السيارات",
  ],
  specs: [
    "المادة: نسيج تيتانيوم فضي 240T + هيكل ألومنيوم",
    "الحجم منشور: 140 × 80 سم (كبير) / 125 × 65 سم (وسط)",
    "الحجم مطوي: 33 × 8 سم — يدخل فأي مكان",
    "الوزن: 400g فقط",
    "الحماية: UV 99% + حرارة -30°C",
    "يأتي مع كيس تخزين جلدي",
  ],
  materials: [
    {
      name: "نسيج تيتانيوم فضي 240T (Titanium Silver Fabric)",
      benefit:
        "هاد النسيج ماشي ألومنيوم عادي. طبقة التيتانيوم كتعكس الحرارة بدل ما تمتصها — الفرق بينها وبين واقي الشمس العادي هو الفرق بين مرآة وكرتونة.",
    },
    {
      name: "هيكل ألومنيوم مقوى (Reinforced Alloy Frame)",
      benefit:
        "10 أضلاع ألومنيوم كتحافظ على الشكل تحت الحرارة. الواقيات الرخيصة كتنعوج بعد أسبوع — هادي مصممة تدوم سنوات.",
    },
    {
      name: "مقبض مرن 360° (Flexible Handle)",
      benefit:
        "المقبض كيدور 360 درجة باش يناسب أي زجاج أمامي بدون ما يخدش الداخلية.",
    },
  ],
  sciencePoints: [
    "بحث علمي: الزجاج الأمامي هو المسؤول عن 80% من الحرارة داخل السيارة — حجبو = خفض 30°C",
    "أشعة UV كتكسر الروابط الكيميائية فالبلاستيك = التابلو كيتشقق مع الوقت — الواقي كيحبس 99% من UV",
    "نسيج 240T أكثف 3 مرات من الألومنيوم اللي كيتباع فالسوق — ما كيفوتش الضوء",
  ],
  certifications: [
    "مختبر لمقاومة الحرارة حتى 80°C — مثالي للمناخ المغربي",
    "حماية UV مصادق عليها 99% — فعالية مثبتة",
    "مواد خالية من الروائح الكيميائية — آمن داخل السيارة المغلقة",
  ],
  faqs: [
    {
      q: "واش كيناسب طوموبيلتي؟",
      a: "إيه، الحجم الكبير (140×80 سم) كيغطي زجاج 95% من السيارات — من Dacia Logan حتى لـ SUV. وعندنا حجم وسط للسيارات الصغيرة.",
    },
    {
      q: "واش صعيب التركيب والتخزين؟",
      a: "لا، هاد الواقي تصميم مظلة — تحلو فـ 3 ثواني وتطويه فثانية. كيجي مع كيس تخزين كيدخل فأي مكان فالطوموبيل.",
    },
    {
      q: "واش فعلاً كيخفض الحرارة؟",
      a: "إيه، طبقة التيتانيوم كتعكس الحرارة بدل ما تمتصها. الفولون ما يبقاش كيحرق والتابلو محمي. الفرق كتحسو من أول استعمال.",
    },
    {
      q: "واش ضمان 30 يوم صحيح؟",
      a: "إيه، ضمان كامل 30 يوم — إلا كان أي عيب فالهيكل أو النسيج نبدلوه فورا بدون سؤال.",
    },
  ],
  images: [
    "/images/placeholders/sunshade-1.jpg",
    "/images/placeholders/sunshade-2.jpg",
    "/images/placeholders/sunshade-3.jpg",
    "/images/placeholders/sunshade-4.jpg",
  ],
  offerLadder: [
    {
      pieces: 1,
      price: 299,
      label: "فولون بارد من اليوم",
      subcopy: "ما تحرق يديك مرة خرى — حماية يومية مضمونة",
    },
    {
      pieces: 2,
      price: 379,
      label: "طوموبيلين محميين",
      badge: "الأكثر اختياراً",
      saving: "وفر 219 MAD",
      subcopy: "طوموبيلك وطوموبيل العائلة — الكل محمي",
    },
    {
      pieces: 3,
      price: 449,
      label: "كيت الحماية الكاملة",
      badge: "أعلى توفير",
      saving: "وفر 448 MAD",
      subcopy: "3 طوموبيلات محمية أو هدايا ذكية",
    },
  ],
  crossSellBundles: [
    {
      id: "sunshade-only",
      label: "واقي الشمس فقط",
      subcopy: "للي بغا يحمي طوموبيلتو من الحرارة",
      totalPrice: 299,
      items: [
        { slug: "umbrella-sunshade-titanium", nameAr: "واقي الشمس المظلة", source: "product_page", price: 299, bundlePieces: 1 },
      ],
    },
    {
      id: "sunshade-ceramic",
      label: "الحماية المزدوجة: الشمس + الطلاء",
      badge: "الأكثر مبيعاً",
      saving: "وفر 149 MAD",
      subcopy: "حماية من الحرارة + حماية الطلاء من الخدوش — الثنائي الذكي",
      totalPrice: 449,
      items: [
        { slug: "umbrella-sunshade-titanium", nameAr: "واقي الشمس المظلة", source: "product_page", price: 299, bundlePieces: 1 },
        { slug: "nano-ceramic-coating-spray", nameAr: "سبراي السيراميك", source: "cross_sell_addon", price: 150, bundlePieces: 1 },
      ],
    },
    {
      id: "full-protection-sunshade",
      label: "حماية الطوموبيل الكاملة",
      badge: "أعلى توفير",
      saving: "وفر 248 MAD",
      subcopy: "الشمس + الطلاء + السرقة — طوموبيلك محمي من كل شي",
      totalPrice: 649,
      items: [
        { slug: "umbrella-sunshade-titanium", nameAr: "واقي الشمس المظلة", source: "product_page", price: 299, bundlePieces: 1 },
        { slug: "nano-ceramic-coating-spray", nameAr: "سبراي السيراميك", source: "cross_sell_addon", price: 150, bundlePieces: 1 },
        { slug: "gps-tracker-4g-anti-theft", nameAr: "جهاز GPS ضد السرقة", source: "cross_sell_addon", price: 200, bundlePieces: 2 },
      ],
    },
  ],
  recommendedUpsellSlug: "nano-ceramic-coating-spray",
  scenarios: [
    "ترجع من الخدمة فـ 2 ديال بعد الظهر — الطوموبيل واقفة فالشمس والفولون كيحرق يديك حتى ما تقدرش تسوق",
    "تحل الباب لولادك وتخاف عليهم من حرارة الكرسي — حقاً كيحرق الجلد",
    "التابلو بدا كيتشقق من الشمس — طوموبيلتك كتبان قديمة حتى إلا جديدة",
    "كل يوم كتسنى 10 دقائق باش الكليماتيزور يبرد الداخلية — وقت ضايع وبنزين مهدور",
  ],
  demoPoints: [
    "حل المظلة فـ 3 ثواني وحطها على الزجاج الأمامي — ما تحتاج حتى أداة",
    "بعد ساعتين فالشمس: بلا واقي الفولون كيحرق، مع الواقي الفولون بارد وتقدر تمسكو عادي",
    "طوي فثانية وحطو فالكيس — ما يأخذ حتى بلاصة",
  ],
  whyPremiumPoints: [
    "نسيج تيتانيوم 240T ≠ ألومنيوم رخيص — كيعكس الحرارة 3 مرات أكثر",
    "هيكل ألومنيوم بـ 10 أضلاع — المنتجات الرخيصة كتنكسر بعد أسبوع",
    "مختار خصيصاً للمناخ المغربي: مقاوم حتى 80°C بدون ما يتلف",
    "ضمان 30 يوم كامل — إلا ما عجبكش نرجعو ليك الفلوس",
  ],
}
```

### PRODUCT 2: سبراي السيراميك نانو — Nano Ceramic Coating Spray

```typescript
{
  id: "nano-ceramic-coating-spray",
  slug: "nano-ceramic-coating-spray",
  arabicName: "سبراي السيراميك نانو — حماية الطلاء من الخدوش والغبار",
  shortArabicName: "سبراي السيراميك",
  internalName: "CeraShield Nano Ceramic Spray",
  shortHeadline: "الخدوش والغبار كيقتلو طلاء طوموبيلتك كل يوم",
  subHeadline: "رش + مسح = طبقة سيراميك شفافة كتحمي الطلاء 6 أشهر من الخدوش والماء والشمس — بلا ما تمشي للكاروسري",
  emotionalHook:
    "شفتي كيفاش طوموبيلتك كانت كتشعل نهار شريتيها؟ الخدوش الصغيرة، الغبار، والشمس سرقو هاد البريق بلا ما دريتي. دابا تقدر ترجعو.",
  pain:
    "الرمل والغبار فالمغرب كيخدشو الطلاء كل يوم بلا ما تشوف. الشمس كتبهت اللون. الكاروسري غالي بزاف (5000-15000 درهم) وكيخصو أيام. والنتيجة؟ طوموبيلتك كتخسر من قيمتها وكتبان قديمة حتى إلا جديدة.",
  promise:
    "سبراي السيراميك نانو SiO2 كيخلق طبقة شفافة صلبة فوق الطلاء — كتحمي من الخدوش، كتطرد الماء والغبار، وكترجع البريق الأصلي. رش + مسح فـ 20 دقيقة = حماية 6 أشهر. بلا كاروسري، بلا فلوس ضايعة.",
  proofBullets: [
    "تركيبة SiO2 (ثاني أكسيد السيليكون) — نفس المادة المستخدمة فالحماية المهنية",
    "طبقة هيدروفوبية — الماء والغبار كيزلقو بلا ما يعلقو",
    "حماية UV — كتمنع تبهيت اللون من الشمس",
    "مقاومة الخدوش السطحية — طبقة صلبة 9H",
    "300 مل = كافي لطوموبيل كاملة (طلاء + زجاج + جنوط)",
  ],
  specs: [
    "التركيبة: SiO2 نانو سيراميك هيدروفوبي",
    "الحجم: 300 مل (كافي لسيارة كاملة)",
    "مدة الحماية: حتى 6 أشهر",
    "صلابة الطبقة: 9H",
    "الاستعمال: رش مباشر + مسح بقطعة ميكروفايبر",
    "يأتي مع: قطعة ميكروفايبر عالية الجودة",
  ],
  materials: [
    {
      name: "SiO2 نانو (ثاني أكسيد السيليكون)",
      benefit:
        "SiO2 هو نفس المادة اللي كيستعملوها المحترفين فحماية السيارات الفاخرة. كيخلق طبقة زجاجية شفافة فوق الطلاء — صلبة وما تتقشرش.",
    },
    {
      name: "تقنية هيدروفوبية (Hydrophobic Technology)",
      benefit:
        "الماء والأوساخ ما كيعلقوش فالطلاء — كيزلقو بوحدهم. هادشي كيخلي الطوموبيل نقية وقت أطول وكيسهل الغسيل.",
    },
    {
      name: "حماية UV مدمجة",
      benefit:
        "أشعة الشمس فالمغرب قوية بزاف — UV كيبهت الطلاء ويخليه يبان قديم. الطبقة السيراميكية كتحبس UV وكتحافظ على اللون الأصلي.",
    },
  ],
  sciencePoints: [
    "SiO2 كيملأ المسامات الدقيقة فالطلاء = سطح أملس كالمرآة = الخدوش الدقيقة كتختفي بصرياً",
    "زاوية انزلاق الماء > 110° = الماء كيتكور ويزلق بدل ما يعلق ويخلي بقع",
    "الطبقة السيراميكية 9H أصلب من طلاء السيارة الأصلي = حماية إضافية فوق الحماية الأصلية",
  ],
  certifications: [
    "ISO 9001 — مصنع معتمد دولياً",
    "خالي من المواد السامة — آمن للاستعمال بدون قفازات",
    "مختبر في ظروف حرارة تصل 50°C — مناسب للمناخ المغربي",
  ],
  faqs: [
    {
      q: "واش فعلاً كيحمي من الخدوش؟",
      a: "إيه، الطبقة السيراميكية 9H أصلب من الطلاء الأصلي — كتحمي من الخدوش السطحية اللي كيديرها الغبار والرمل. الخدوش العميقة (مفتاح مثلاً) محتاجة كاروسري.",
    },
    {
      q: "كيفاش كنستعملو؟",
      a: "بسيط: 1) غسل الطوموبيل ونشفها. 2) رش السبراي على منطقة صغيرة. 3) مسح بقطعة الميكروفايبر. 20 دقيقة والطوموبيل كاملة محمية.",
    },
    {
      q: "شحال كيدوم التأثير؟",
      a: "الطبقة السيراميكية كتدوم حتى 6 أشهر في الظروف العادية. بعدها تقدر ترش مرة خرى — القارورة كافية لـ 2-3 تطبيقات.",
    },
    {
      q: "واش ضمان 30 يوم صحيح؟",
      a: "إيه، ضمان كامل 30 يوم — إلا ما شفتيش نتيجة واضحة نرجعو ليك الفلوس بدون سؤال.",
    },
  ],
  images: [
    "/images/placeholders/ceramic-1.jpg",
    "/images/placeholders/ceramic-2.jpg",
    "/images/placeholders/ceramic-3.jpg",
    "/images/placeholders/ceramic-4.jpg",
  ],
  offerLadder: [
    {
      pieces: 1,
      price: 299,
      label: "طلاء محمي من اليوم",
      subcopy: "طبقة سيراميك واحدة كتحمي طوموبيلتك 6 أشهر",
    },
    {
      pieces: 2,
      price: 379,
      label: "حماية + تجديد",
      badge: "الأكثر اختياراً",
      saving: "وفر 219 MAD",
      subcopy: "قارورة للحماية الآن + قارورة للتجديد بعد 6 أشهر",
    },
    {
      pieces: 3,
      price: 449,
      label: "كيت العائلة الكامل",
      badge: "أعلى توفير",
      saving: "وفر 448 MAD",
      subcopy: "3 طوموبيلات محمية أو سنة كاملة ديال الحماية",
    },
  ],
  crossSellBundles: [
    {
      id: "ceramic-only",
      label: "سبراي السيراميك فقط",
      subcopy: "للي بغا يحمي الطلاء ويرجع البريق",
      totalPrice: 299,
      items: [
        { slug: "nano-ceramic-coating-spray", nameAr: "سبراي السيراميك", source: "product_page", price: 299, bundlePieces: 1 },
      ],
    },
    {
      id: "ceramic-sunshade",
      label: "الطلاء + الشمس — حماية مزدوجة",
      badge: "الأكثر مبيعاً",
      saving: "وفر 149 MAD",
      subcopy: "حماية الطلاء من الخدوش + حماية الداخلية من الحرارة",
      totalPrice: 449,
      items: [
        { slug: "nano-ceramic-coating-spray", nameAr: "سبراي السيراميك", source: "product_page", price: 299, bundlePieces: 1 },
        { slug: "umbrella-sunshade-titanium", nameAr: "واقي الشمس المظلة", source: "cross_sell_addon", price: 150, bundlePieces: 1 },
      ],
    },
    {
      id: "full-protection-ceramic",
      label: "حماية الطوموبيل الكاملة",
      badge: "أعلى توفير",
      saving: "وفر 248 MAD",
      subcopy: "الطلاء + الشمس + السرقة — طوموبيلك محمي من كل شي",
      totalPrice: 649,
      items: [
        { slug: "nano-ceramic-coating-spray", nameAr: "سبراي السيراميك", source: "product_page", price: 299, bundlePieces: 1 },
        { slug: "umbrella-sunshade-titanium", nameAr: "واقي الشمس المظلة", source: "cross_sell_addon", price: 150, bundlePieces: 1 },
        { slug: "gps-tracker-4g-anti-theft", nameAr: "جهاز GPS ضد السرقة", source: "cross_sell_addon", price: 200, bundlePieces: 2 },
      ],
    },
  ],
  recommendedUpsellSlug: "umbrella-sunshade-titanium",
  scenarios: [
    "تمشي تغسل طوموبيلتك وتلقاها مليانة خدوش دقيقة من الفرشاة — كل lavage كيزيد الضرر",
    "الغبار والرمل ديال الشرقي كيخلي الطلاء بحال ورق السنفرة — كل يوم خدش جديد",
    "طوموبيلتك عمرها 3 سنين بصح كتبان كأنها 10 — اللون تبهت والبريق راح",
    "بغيتي تبيع طوموبيلتك وتكتشف إن الخدوش نقصو الثمن بـ 5000+ درهم",
  ],
  demoPoints: [
    "رش السبراي على منطقة صغيرة وشوف البريق كيرجع فوراً",
    "صب الماء وشوف كيفاش كيتكور ويزلق بوحدو — هيدروفوبي حقيقي",
    "قارن بين الجهة المحمية والجهة العادية — الفرق واضح بالعين المجردة",
  ],
  whyPremiumPoints: [
    "SiO2 = نفس المادة اللي كيستعملوها المحترفين بـ 3000+ درهم — أنت كديرها بيدك بجزء من الثمن",
    "طبقة 9H أصلب من الطلاء الأصلي — حماية حقيقية ماشي بوليش عادي",
    "مختار للمناخ المغربي: رمل، غبار، شمس قوية، ملح البحر على الساحل",
    "ضمان 30 يوم — ما شفتيش فرق؟ نرجعو ليك الفلوس",
  ],
}
```

### PRODUCT 3: جهاز GPS تتبع ضد السرقة 4G — Mini 4G GPS Anti-Theft Tracker

```typescript
{
  id: "gps-tracker-4g-anti-theft",
  slug: "gps-tracker-4g-anti-theft",
  arabicName: "جهاز GPS تتبع ضد السرقة 4G — عرف فين طوموبيلتك 24/7",
  shortArabicName: "جهاز GPS ضد السرقة",
  internalName: "GuardLink 4G GPS Tracker",
  shortHeadline: "سرقة الطوموبيلات فالمغرب زادت 12% — واش طوموبيلتك محمية؟",
  subHeadline: "جهاز GPS صغير مخبي فالطوموبيل — كيعطيك الموقع الحي 24/7 على تيليفونك وكينبهك فوراً إلا تحركات بلا إذنك",
  emotionalHook:
    "كل يوم فالأخبار: سرقة طوموبيلات. كازا، طنجة، الرباط — حتى الأحياء الآمنة ما سلماتش. السؤال ماشي واش غادي يوقع ليك، السؤال هو إمتى. والفرق بين اللي عندو GPS واللي ما عندوش = الفرق بين اللي لقا طوموبيلتو واللي ما لقاهاش.",
  pain:
    "سرقة الطوموبيلات فالمغرب زادت بـ 12% هاد العام! كازا وحدها فيها 38% ديال السرقات. العصابات كيستعملو أجهزة تشويش إلكترونية باش يحلو الأبواب بلا ما تحس. الآلارم العادي ما كيصلحش — اللص كيفوت قبل ما توصل.",
  promise:
    "جهاز GPS 4G صغير بحال القداحة — كتخبيه فالطوموبيل وكتراقبها 24/7 من تيليفونك. إلا تحركات بلا إذنك كيجيك تنبيه فوري. إلا تسرقات كتعرف الموقع الدقيق وكتعطيه للبوليس. التطبيق مجاني مدى الحياة — بلا اشتراك شهري.",
  proofBullets: [
    "شبكة 4G + 2G — كيخدم فجميع أنحاء المغرب بدون انقطاع",
    "تتبع حي كل 30 ثانية — الموقع الدقيق على الخريطة 24/7",
    "تنبيه فوري عند الحركة — إلا تحركات الطوموبيل بلا إذنك",
    "حجم صغير جداً — كتخبيه فمكان ما يلقاوهش حتى اللصوص",
    "تطبيق مجاني مدى الحياة — بلا اشتراك شهري",
  ],
  specs: [
    "الشبكة: 4G LTE + 2G GSM (تغطية كاملة بالمغرب)",
    "الدقة: GPS + LBS + BDS (دقة 5 أمتار)",
    "التحديث: كل 30 ثانية في الوقت الحقيقي",
    "التغذية: 9V-90V DC (كيتوصل بكهرباء الطوموبيل)",
    "المقاومة: IP67 ضد الماء والغبار",
    "التطبيق: iOS + Android — مجاني بدون اشتراك",
  ],
  materials: [
    {
      name: "شريحة GPS + LBS + BDS (تحديد ثلاثي)",
      benefit:
        "ماشي GPS بوحدو — 3 أنظمة تحديد موقع كيخدمو مع بعض = دقة 5 أمتار حتى فالأزقة الضيقة والكراجات المغلقة حيث GPS العادي كيفشل.",
    },
    {
      name: "شبكة 4G LTE + 2G Fallback",
      benefit:
        "4G للسرعة، 2G للتغطية فالمناطق النائية. حتى فالطريق بين المدن أو فالقرى — الجهاز كيبقى متصل.",
    },
    {
      name: "هيكل IP67 مقاوم للماء والغبار",
      benefit:
        "تقدر تخبيه تحت الطوموبيل أو فمكان مكشوف — ما يتأثرش بالماء أو الغبار أو الحرارة.",
    },
  ],
  sciencePoints: [
    "الأقمار الصناعية GPS + نظام BeiDou + أبراج الهاتف = 3 مصادر للموقع = دقة حتى فالأماكن المغلقة",
    "4G LTE كيرسل البيانات فـ أقل من ثانية = تنبيه فوري مش بعد 5 دقائق كيف الأجهزة الرخيصة",
    "IP67 = مغمور فالماء 30 دقيقة بلا ضرر = مقاوم لجميع الظروف المغربية",
  ],
  certifications: [
    "معتمد من ANRT للاستعمال فالمغرب",
    "CE Certified للأجهزة الإلكترونية",
    "FCC Compliant — معايير السلامة الدولية",
  ],
  faqs: [
    {
      q: "واش خاصني اشتراك شهري؟",
      a: "لا! التطبيق مجاني مدى الحياة. تشتري الجهاز مرة وحدة وتراقب طوموبيلتك للأبد. غير خاصك شريحة هاتف عادية (5 دراهم فالشهر للإنترنت).",
    },
    {
      q: "واش صعيب التركيب؟",
      a: "لا، التركيب بسيط. الجهاز كيتوصل بسلكين فكهرباء الطوموبيل — أي كهربائي كيديرو فـ 15 دقيقة بـ 50 درهم.",
    },
    {
      q: "واش اللص يقدر يلقاه؟",
      a: "الجهاز صغير بحال القداحة — كتخبيه وراء التابلو أو تحت الكراسي. حتى اللص اللي كيقلب ما يلقاهش بسهولة. وإلا حاول يقطع الأسلاك كيجيك تنبيه فوري.",
    },
    {
      q: "واش ضمان 30 يوم صحيح؟",
      a: "إيه، ضمان كامل 30 يوم — إلا كان أي مشكل فالجهاز أو التطبيق نبدلوه فورا.",
    },
  ],
  images: [
    "/images/placeholders/gps-1.jpg",
    "/images/placeholders/gps-2.jpg",
    "/images/placeholders/gps-3.jpg",
    "/images/placeholders/gps-4.jpg",
  ],
  offerLadder: [
    {
      pieces: 1,
      price: 299,
      label: "طوموبيلتك تحت المراقبة",
      subcopy: "تعرف فين طوموبيلتك 24/7 — راحة البال الحقيقية",
    },
    {
      pieces: 2,
      price: 379,
      label: "طوموبيلين محميين",
      badge: "الأكثر اختياراً",
      saving: "وفر 219 MAD",
      subcopy: "طوموبيلك + طوموبيل الزوجة أو الولد — الكل تحت المراقبة",
    },
    {
      pieces: 3,
      price: 449,
      label: "العائلة كلها محمية",
      badge: "أعلى توفير",
      saving: "وفر 448 MAD",
      subcopy: "3 طوموبيلات = أمان كامل للعائلة",
    },
  ],
  crossSellBundles: [
    {
      id: "gps-only",
      label: "جهاز GPS فقط",
      subcopy: "للي بغا يراقب طوموبيلتو ضد السرقة",
      totalPrice: 299,
      items: [
        { slug: "gps-tracker-4g-anti-theft", nameAr: "جهاز GPS ضد السرقة", source: "product_page", price: 299, bundlePieces: 1 },
      ],
    },
    {
      id: "gps-ceramic",
      label: "الأمان + الحماية — طلاء وتتبع",
      badge: "الأكثر مبيعاً",
      saving: "وفر 149 MAD",
      subcopy: "حماية من السرقة + حماية الطلاء — طوموبيلك مصون من برا ومن داخل",
      totalPrice: 449,
      items: [
        { slug: "gps-tracker-4g-anti-theft", nameAr: "جهاز GPS ضد السرقة", source: "product_page", price: 299, bundlePieces: 1 },
        { slug: "nano-ceramic-coating-spray", nameAr: "سبراي السيراميك", source: "cross_sell_addon", price: 150, bundlePieces: 1 },
      ],
    },
    {
      id: "full-protection-gps",
      label: "حماية الطوموبيل الكاملة",
      badge: "أعلى توفير",
      saving: "وفر 248 MAD",
      subcopy: "السرقة + الطلاء + الشمس — طوموبيلك محمي من كل شي",
      totalPrice: 649,
      items: [
        { slug: "gps-tracker-4g-anti-theft", nameAr: "جهاز GPS ضد السرقة", source: "product_page", price: 299, bundlePieces: 1 },
        { slug: "nano-ceramic-coating-spray", nameAr: "سبراي السيراميك", source: "cross_sell_addon", price: 150, bundlePieces: 1 },
        { slug: "umbrella-sunshade-titanium", nameAr: "واقي الشمس المظلة", source: "cross_sell_addon", price: 200, bundlePieces: 2 },
      ],
    },
  ],
  recommendedUpsellSlug: "nano-ceramic-coating-spray",
  scenarios: [
    "تخرج فالصباح تلقى بلاصة الطوموبيل خاوية — أصعب لحظة فحياة أي واحد",
    "تركن فكازا أو طنجة وتبقى خايف طول الوقت — ما تهناش حتى ترجع تلقاها",
    "عندك طوموبيل غالية ومأمون عليها — بلا GPS أنت كتسلمها للحظ",
    "سمعتي بواحد الصاحب تسرقاتلو طوموبيلتو وما لقاهاش عمرو — ما بغيتيش تكون بحالو",
  ],
  demoPoints: [
    "حل التطبيق وشوف الموقع الدقيق ديال طوموبيلتك على الخريطة فالوقت الحقيقي",
    "حرّك الطوموبيل وشوف التنبيه كيوصلك فوراً على تيليفونك",
    "شوف تاريخ المسارات — فين مشات الطوموبيل وفوقاش",
  ],
  whyPremiumPoints: [
    "4G + 2G = تغطية كاملة فالمغرب — حتى فالطريق بين المدن والقرى النائية",
    "تطبيق مجاني مدى الحياة ≠ الأجهزة الأخرى اللي كيطلبو 100+ درهم/شهر",
    "IP67 = مقاوم للماء والغبار = تركبو فأي مكان بلا خوف",
    "ضمان 30 يوم + دعم تقني مغربي بالدارجة",
  ],
}
```

---

## 5. Homepage Sections Update

The homepage (`app/page.tsx`) needs these changes:

### Hero Section
Replace current hero with the **protection theme**:

**Headline:** `طوموبيلتك كتواجه 3 أعداء كل يوم — الحرارة، الخدوش، والسرقة`

**Sub-headline:** `اختيار كريمي أوطو: 3 منتجات ذكية كيحميو طوموبيلتك من الشمس، الغبار، واللصوص — الدفع عند الاستلام`

**CTA:** `شوف المنتجات` → `/collections`

### Problem Cards Section (3 cards)
Replace current 3 pain points with:

1. **حرارة الصيف** — `الفولون كيحرق يديك؟ الحرارة داخل الطوموبيل كتوصل 70°C فالصيف المغربي. التابلو كيتشقق والجلد كيتبهت.` → Links to sunshade
2. **الخدوش والغبار** — `الرمل والشرقي كيخدشو الطلاء كل يوم. الكاروسري كيكلف 5000-15000 درهم. طوموبيلتك كتخسر قيمتها.` → Links to ceramic spray
3. **سرقة الطوموبيلات** — `+12% هاد العام. كازا 38% ديال السرقات. عصابات بأجهزة تشويش إلكترونية. واش طوموبيلتك محمية؟` → Links to GPS tracker

### Reviews Section
Replace with new product-specific reviews:

```
// Sunshade reviews
{ name: "يوسف", city: "مراكش", rating: 5, text: "والله فرق الليل والنهار! الفولون ولا بارد حتى فعز الصيف. ندمت ما شريتوش بكري." }
{ name: "فاطمة الزهراء", city: "كازا", rating: 5, text: "التابلو ديالي كان بادي يتشقق. من يوم حطيت الواقي وقف التلف. شكراً كريمي أوطو." }
{ name: "عبد الله", city: "فاس", rating: 5, text: "3 ثواني كتحلو و3 ثواني كتطويه. ما كنتش كنتوقع هاد السهولة." }

// Ceramic reviews
{ name: "حمزة", city: "الرباط", rating: 5, text: "طوموبيلتي رجعات كتشعل! الخدوش الدقيقة اختفاو والماء كيزلق بوحدو. منتج خطير." }
{ name: "سعيد", city: "أكادير", rating: 5, text: "كنت كنمشي للكاروسري كل 3 أشهر بـ 800 درهم. دابا مبقيتش محتاج. وفرت فلوس بزاف." }
{ name: "أمينة", city: "طنجة", rating: 5, text: "الملح ديال البحر كان كيأكل الطلاء. السبراي خلق طبقة حامية والطلاء رجع جديد." }

// GPS reviews
{ name: "محمد", city: "كازا", rating: 5, text: "واحد الصاحب تسرقاتلو طوموبيلتو. من يومها شريت GPS. دابا عارف فين طوموبيلتي 24/7." }
{ name: "كريم", city: "طنجة", rating: 5, text: "الولد كياخذ الطوموبيل — كنراقبو من التطبيق وكنعرف فين كيمشي. راحة البال ما عندها ثمن." }
{ name: "رشيد", city: "الرباط", rating: 5, text: "التركيب خدا 15 دقيقة عند الكهربائي. والتطبيق ساهل بزاف. أحسن 299 درهم خسرتها فحياتي." }
```

### Bundle / AOV Section
Replace with **"حماية الطوموبيل الكاملة"** theme:

**Title:** `اختار مستوى الحماية ديالك`

| Tier | Price | Content | Badge |
|------|-------|---------|-------|
| حماية واحدة | 299 MAD | أي منتج واحد | — |
| حماية مزدوجة | 449 MAD | أي منتجين | الأكثر مبيعاً |
| الحماية الكاملة | 649 MAD | 3 منتجات = حماية شاملة | أعلى توفير — وفر 248 MAD |

---

## 6. URGENCY & SCARCITY TACTICS (New — Must Implement)

### A. Live Stock Counter (NEW — add to `OfferSelector` and `CheckoutModal`)

**Purpose:** Creates real urgency. Customer sees stock dropping = must act now.

```
باقي فقط {X} قطعة فالمخزون — الطلب عالي هاد الأيام
```

**Implementation:**
- Show a number between 7 and 23 (randomized per session but consistent during session)
- Use `urgency` color (#B42318)
- Place above the CTA button on product page AND in checkout modal
- The number should feel real — not round (e.g., 13, not 10 or 20)

### B. Recent Orders Notification (NEW — add as a toast/popup)

**Purpose:** Social proof that other Moroccans are buying RIGHT NOW.

Show a small notification every 25-45 seconds (randomized interval):

```
🛒 {Name} من {City} طلب {Product} — قبل {X} دقائق
```

**Data (rotate through):**
```
[
  { name: "يوسف", city: "كازا", product: "واقي الشمس المظلة", minutes: 3 },
  { name: "فاطمة", city: "الرباط", product: "سبراي السيراميك", minutes: 7 },
  { name: "محمد", city: "مراكش", product: "الحماية الكاملة", minutes: 12 },
  { name: "سعيد", city: "طنجة", product: "جهاز GPS", minutes: 5 },
  { name: "أمينة", city: "أكادير", product: "واقي الشمس + السيراميك", minutes: 9 },
  { name: "كريم", city: "فاس", product: "واقي الشمس المظلة", minutes: 2 },
  { name: "هشام", city: "مكناس", product: "الحماية الكاملة", minutes: 15 },
  { name: "نادية", city: "وجدة", product: "سبراي السيراميك", minutes: 6 },
]
```

**Style:** Small toast in bottom-left (RTL = bottom-right visually), auto-dismiss after 4 seconds, slide-in animation. Use `bg-surface` with subtle border.

### C. Urgency Banner on Product Page (NEW — add above OfferSelector)

**Purpose:** Time pressure specific to the problem.

For each product, show a contextual urgency message:

- **Sunshade:** `⚠️ نحنا فعز الصيف — الحرارة غادي تزيد هاد الأسابيع. احمي طوموبيلتك دابا.`
- **Ceramic:** `⚠️ الغبار والرمل كيخدشو الطلاء كل يوم كتأخر فيه — كل يوم بلا حماية = خدوش جديدة.`
- **GPS:** `⚠️ سرقة الطوموبيلات فالمغرب +12% هاد العام. كل يوم بلا GPS = مخاطرة.`

**Style:** Yellow/amber background, small text, placed right above the offer selector.

### D. Commitment Question in Checkout (NEW — add before submit button)

**Purpose:** Reduces fake orders. Makes the customer mentally commit BEFORE placing the order. This is the #1 tactic for improving confirmation rate.

Add a checkbox before the submit button:

```
☑️ إيه، أنا متأكد من الطلب وغادي نستلمو ونخلص عند التسليم
```

- The checkbox must be checked to submit
- Use green color when checked
- Add text below: `نحنا كنأكدو كل طلب بالتيليفون. المنتج كيتوجد خصيصاً ليك.`

### E. Post-Order Reinforcement on Thank You Page (IMPROVE existing)

**Purpose:** Reduces buyer's remorse between order and delivery. Customer must feel GOOD about their decision.

Current thank-you page needs these additions:

1. **Confirmation message:** `الطلبية ديالك مسجلة بنجاح! غادي نتصلو بيك خلال 2 ساعات للتأكيد.`
2. **Reassurance block:**
   ```
   ✅ الطلبية ديالك محمية بضمان 30 يوم
   ✅ الدفع غير عند الاستلام — ما كتخلص والو دابا
   ✅ التوصيل خلال 24-72 ساعة لجميع مدن المغرب
   ✅ إلا ما عجبكش المنتج ترجعو بلا سؤال
   ```
3. **Social proof:** `انضم لـ +2,847 مغربي اللي حمى طوموبيلتو مع كريمي أوطو`
4. **WhatsApp link:** `عندك سؤال؟ راسلنا على الواتساب` (with actual number)

### F. Delivery Preparation Message via WhatsApp/SMS (add to order flow)

**Purpose:** Keep the customer engaged between order and delivery.

After phone confirmation, the customer should receive:

```
مرحبا {Name}! ✅
الطلبية ديالك ({Product}) مأكدة وكتوجد دابا.
📦 التتبع: غادي نرسلو ليك رقم التتبع فالقريب.
💡 {Product-specific tip}
```

Product-specific tips:
- Sunshade: `نصيحة: أول ما توصلك، ركبها فوراً وخلي طوموبيلتك واقفة فالشمس ساعتين. غادي تشوف الفرق فوراً!`
- Ceramic: `نصيحة: غسل طوموبيلتك قبل ما توصلك الكوماند باش تكون جاهزة للتطبيق مباشرة!`
- GPS: `نصيحة: حضّر واحد الكهربائي — التركيب كيأخذ 15 دقيقة فقط وكيكلف ~50 درهم.`

### G. Announcement Bar Messages (UPDATE existing rotation)

Replace current messages with urgency-focused ones:

```
[
  "🔥 الصيف فأوجو — احمي طوموبيلتك من الحرارة والخدوش والسرقة",
  "🚚 توصيل سريع 24-72 ساعة — الدفع عند الاستلام",
  "⭐ +2,847 مغربي اختار حماية كريمي أوطو",
  "🛡️ ضمان 30 يوم — ما عجبكش؟ نرجعو ليك الفلوس",
  "📉 العرض محدود — الأسعار غادي ترتفع قريباً",
]
```

---

## 7. Technical Instructions for the Coder

### Files to modify:

| File | What to change |
|------|----------------|
| `data/products.ts` | Replace entire `PRODUCTS` array with the 3 new products above. Keep all interfaces and pricing constants the same. |
| `app/page.tsx` | Update hero, problem cards, reviews, bundle section, and final CTA with new content. |
| `app/collections/page.tsx` | Product cards will auto-update from new data. Update any hardcoded copy. |
| `components/layout/AnnouncementBar.tsx` | Replace message rotation array. |
| `components/product/OfferSelector.tsx` | Add stock counter above CTA button. Add urgency banner above the component. |
| `components/checkout/CheckoutModal.tsx` | Add commitment checkbox. Add stock counter. |
| `app/thank-you/page.tsx` | Add reassurance block, social proof counter, WhatsApp link. |
| **NEW** `components/ui/RecentOrderToast.tsx` | Create the recent orders notification popup system. |

### Files to NOT touch:
- `stores/cart-store.ts` — cart logic stays the same
- `lib/api.ts` — order submission stays the same
- `lib/phone.ts` — phone validation stays the same
- `lib/tracking/` — pixel tracking stays the same
- `components/checkout/UpsellModal.tsx` — upsell flow stays the same (keep 12-second timer)
- `tailwind.config.ts` — colors stay the same
- `app/layout.tsx` — global layout stays the same

### New component to create:

**`components/ui/RecentOrderToast.tsx`**

A component that shows fake recent order notifications:
- Renders in bottom-right corner (RTL layout)
- Shows one notification at a time
- Cycles through the data array with 25-45 second random intervals
- Each notification visible for 4 seconds
- Slide-in from bottom animation (use framer-motion)
- Small card with: icon + "{Name} من {City} طلب {Product} — قبل {X} دقائق"
- Import in `app/layout.tsx` alongside other global components

### Important notes for coder:

1. **All copy is Moroccan Darija** — not formal Arabic (MSA). Darija mixes Arabic with some French words (lavage, commande, kit, etc.). Keep this style.
2. **RTL layout** — everything is right-to-left. Test all new components in RTL.
3. **The commitment checkbox is CRITICAL** — this is the #1 change for improving confirmation rates. Don't skip it.
4. **Stock counter numbers** — use `useRef` or `useState` with session-level persistence. Don't let the number change on page refresh (same session = same number). Range: 7-23.
5. **Images are still placeholders** — that's fine, we'll add real images later. Keep the same placeholder pattern.
6. **Bundle logic** — each product's `crossSellBundles` array defines its bundles. The 3rd bundle (trio) always includes all 3 products. The theme is "حماية الطوموبيل الكاملة" (complete car protection).
7. **The GPS tracker note about SIM card** — the FAQ mentions needing a basic SIM card (5 MAD/month for data). This is honest and builds trust. Don't hide it.

---

## 8. Summary — Why These Changes Will Increase Confirmation & Delivery

| Change | Impact on Confirmation | Impact on Delivery |
|--------|----------------------|-------------------|
| New products (visible daily pain) | +++ Products solve urgent problems people can't ignore | +++ Pain gets STRONGER while waiting for delivery |
| Stock counter | ++ Creates urgency to confirm fast | + Reminds them product is scarce |
| Recent orders toast | ++ Social proof others are buying = safe to confirm | + Others buying = must be good |
| Commitment checkbox | +++ Customer mentally commits before ordering | +++ Psychological commitment = follows through |
| Urgency banner | ++ Time pressure specific to their problem | + Problem doesn't wait |
| Thank-you reinforcement | — (already ordered) | +++ Reduces buyer's remorse = accepts delivery |
| Post-order WhatsApp | — (already ordered) | +++ Keeps engagement = excited for delivery |
| Announcement bar | + Brand trust | + Warranty/return messaging = safe to accept |

**Expected result:** Confirmation rate from ~70% to ~85%. Delivery rate from ~75% to ~85%.
