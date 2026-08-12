export const BUNDLE_PRICES: Record<number, number> = {
  1: 299,
  2: 379,
  3: 449,
};

export const UPSELL_PRICE = 199;

// Cross-sell bundle pricing: main product = 299, first add-on = 150, second add-on = 200
export const CROSS_SELL_BUNDLE_PRICES = {
  single: 299,
  duo: 449,    // main 299 + add-on 150
  trio: 649,   // main 299 + add-on1 150 + add-on2 200
};

export interface CrossSellBundleItem {
  slug: string;
  nameAr: string;         // short name for display
  source: "product_page" | "cross_sell_addon";
  price: number;          // this item's price contribution
  bundlePieces: number;   // for product_page=1; for cross_sell_addon: 1=150 MAD, 2=200 MAD
}

export interface CrossSellBundle {
  id: string;
  label: string;
  badge?: string;
  saving?: string;
  subcopy: string;
  totalPrice: number;
  items: CrossSellBundleItem[];
}

export interface OfferOption {
  pieces: number;
  price: number;
  label: string;    // Result-focused headline (not "1 piece / 2 pieces")
  badge?: string;
  saving?: string;
  subcopy: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  arabicName: string;
  shortArabicName: string; // short name used in bundle labels
  internalName: string;
  shortHeadline: string;
  subHeadline: string;
  emotionalHook: string;
  pain: string;
  promise: string;
  proofBullets: string[];
  specs: string[];
  materials: { name: string; benefit: string }[];
  sciencePoints: string[];
  certifications: string[];
  faqs: { q: string; a: string }[];
  images: string[];
  offerLadder: OfferOption[];
  crossSellBundles: CrossSellBundle[]; // new: replaces simple quantity ladder on product page
  recommendedUpsellSlug: string;
  scenarios: string[];
  demoPoints: string[];
  whyPremiumPoints: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "umbrella-sunshade-titanium",
    slug: "umbrella-sunshade-titanium",
    sku: "KA-SUN-001",
    arabicName: "واقي الشمس المظلة تيتانيوم",
    shortArabicName: "واقي الشمس المظلة",
    internalName: "TitanShield Umbrella Sunshade",
    shortHeadline: "كل نهار فالصيف كتحرق يديك فالفولون — وداعاً لهادشي",
    subHeadline: "مظلة تيتانيوم تنشر فـ 3 ثواني — كتخفض الحرارة داخل الطوموبيل بـ 30 درجة وكتحمي التابلو من التشقق",
    emotionalHook:
      "تحل باب الطوموبيل فالصيف وكتحس بحال فرن — الفولون كيحرق والتابلو كيتشقق. وداعاً لهادشي.",
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
      "/images/products/umbrella-sunshade.webp",
      "/images/products/sunshade-hero.webp",
      "/images/products/sunshade-solution.webp",
      "/images/products/sunshade-materials.webp",
      "/images/products/sunshade-specs.webp",
      "/images/products/sunshade-premium.webp",
      "/images/products/sunshade-pain.webp",
      "/images/products/sunshade-certifications.webp",
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
  },
  {
    id: "nano-ceramic-coating-spray",
    slug: "nano-ceramic-coating-spray",
    sku: "KA-CER-002",
    arabicName: "سبراي السيراميك نانو SiO2",
    shortArabicName: "سبراي السيراميك",
    internalName: "CeraShield Nano Ceramic Spray",
    shortHeadline: "الخدوش والغبار كيقتلو طلاء طوموبيلتك كل يوم",
    subHeadline: "رش + مسح = طبقة سيراميك شفافة كتحمي الطلاء 6 أشهر من الخدوش والماء والشمس — بلا ما تمشي للكاروسري",
    emotionalHook:
      "الخدوش والغبار سرقو البريق ديال طوموبيلتك بلا ما دريتي — دابا تقدر ترجعو.",
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
      "/images/products/ceramic-spray.webp",
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
  },
  {
    id: "gps-tracker-4g-anti-theft",
    slug: "gps-tracker-4g-anti-theft",
    sku: "KA-GPS-003",
    arabicName: "جهاز GPS ضد السرقة 4G",
    shortArabicName: "جهاز GPS ضد السرقة",
    internalName: "GuardLink 4G GPS Tracker",
    shortHeadline: "سرقة الطوموبيلات فالمغرب زادت 12% — واش طوموبيلتك محمية؟",
    subHeadline: "جهاز GPS صغير مخبي فالطوموبيل — كيعطيك الموقع الحي 24/7 على تيليفونك وكينبهك فوراً إلا تحركات بلا إذنك",
    emotionalHook:
      "سرقة الطوموبيلات +12% هاد العام — السؤال ماشي واش غادي يوقع ليك، السؤال إمتى.",
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
      "/images/products/gps-tracker.webp",
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
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductImage(slug: string): string {
  const product = PRODUCTS.find((p) => p.slug === slug);
  return product?.images[0] ?? "/images/products/umbrella-sunshade.webp";
}

export function getCrossSellProducts(cartSlugs: string[]): Product[] {
  return PRODUCTS.filter((p) => !cartSlugs.includes(p.slug));
}

export function getUpsellProduct(cartSlugs: string[]): Product | undefined {
  const notInCart = PRODUCTS.filter((p) => !cartSlugs.includes(p.slug));
  return notInCart[0];
}
