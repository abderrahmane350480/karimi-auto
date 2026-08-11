import { CheckCircle } from "lucide-react";

interface ReviewCardProps {
  text: string;
  name: string;
  city?: string;
  stars?: number;
  date?: string;
  product?: string;
}

export default function ReviewCard({
  text,
  name,
  city,
  stars = 5,
  date,
  product,
}: ReviewCardProps) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-0.5">
            {Array.from({ length: stars }).map((_, i) => (
              <span key={i} className="text-accent text-base">★</span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-success font-arabic font-semibold">
            <CheckCircle className="w-3 h-3" />
            شراء مؤكد
          </span>
        </div>
        <p className="text-ink font-arabic text-sm leading-relaxed mb-3">
          &ldquo;{text}&rdquo;
        </p>
        {product && (
          <p className="text-xs text-primary/70 font-arabic mb-3 bg-primary/5 inline-block px-2 py-0.5 rounded-full">
            {product}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm font-arabic">
          {name[0]}
        </div>
        <div>
          <p className="font-arabic font-semibold text-sm text-ink">{name}</p>
          <div className="flex items-center gap-2">
            {city && <p className="text-xs text-muted font-arabic">{city}</p>}
            {date && <p className="text-xs text-muted font-latin">{date}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
