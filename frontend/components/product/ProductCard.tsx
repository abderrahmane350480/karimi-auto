import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";

const PRODUCT_META: Record<string, { badge: string; badgeColor: string }> = {
  "umbrella-sunshade-titanium": {
    badge: "حماية الحرارة",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  "nano-ceramic-coating-spray": {
    badge: "حماية الطلاء",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  "gps-tracker-4g-anti-theft": {
    badge: "ضد السرقة",
    badgeColor: "bg-red-100 text-red-700",
  },
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow group w-full min-w-0">
      <div className="relative">
        <div className="relative w-full aspect-[4/5] bg-white">
          <Image
            src={product.images[0]}
            alt={product.arabicName}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
        <span className="absolute top-3 right-3 bg-primary text-white text-xs font-arabic font-semibold px-2 py-1 rounded-full">
          اختيار كريمي أوطو
        </span>
        {PRODUCT_META[product.slug] && (
          <span className={`absolute top-3 left-3 text-xs font-arabic font-bold px-2 py-1 rounded-full ${PRODUCT_META[product.slug].badgeColor}`}>
            {PRODUCT_META[product.slug].badge}
          </span>
        )}
      </div>

      <div className="p-4 min-w-0">
        <div className="flex items-center gap-1 mb-2">
          <span className="text-accent text-sm">★★★★★</span>
          <span className="text-xs text-muted font-latin">4.8/5</span>
        </div>

        <h3 className="font-arabic font-bold text-ink text-base leading-snug mb-1 line-clamp-2 break-words">
          {product.shortArabicName}
        </h3>
        <p className="font-arabic text-xs font-semibold text-primary mb-1 line-clamp-1">
          {product.shortHeadline}
        </p>
        <p className="text-muted font-arabic text-xs leading-relaxed mb-3 line-clamp-2 break-words">
          {product.subHeadline}
        </p>

        <div className="flex flex-col gap-1 mb-3">
          <div>
            <span className="text-primary font-bold text-lg font-latin">
              299 MAD
            </span>
            <span className="text-muted text-xs font-arabic mr-1"> — قطعة واحدة</span>
          </div>
          <span className="text-success text-xs font-arabic bg-success/10 px-2 py-0.5 rounded-full w-fit">
            الباقة المختارة ابتداء من 449 MAD
          </span>
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="block w-full bg-primary hover:bg-primary-dark text-white font-arabic font-semibold text-center py-3 rounded-cta transition-colors"
        >
          شوف العرض
        </Link>

        <p className="text-center text-xs text-muted font-arabic mt-2">
          الدفع عند الاستلام | ضمان 30 يوم
        </p>
      </div>
    </div>
  );
}
