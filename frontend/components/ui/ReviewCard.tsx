interface ReviewCardProps {
  text: string;
  name: string;
  city?: string;
  stars?: number;
}

export default function ReviewCard({
  text,
  name,
  city,
  stars = 5,
}: ReviewCardProps) {
  return (
    // PLACEHOLDER REVIEW — Replace with real customer reviews after first deliveries
    <div className="bg-surface border border-border rounded-xl p-5">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: stars }).map((_, i) => (
          <span key={i} className="text-accent text-base">★</span>
        ))}
      </div>
      <p className="text-ink font-arabic text-sm leading-relaxed mb-3">
        "{text}"
      </p>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm font-arabic">
          {name[0]}
        </div>
        <div>
          <p className="font-arabic font-semibold text-sm text-ink">{name}</p>
          {city && <p className="text-xs text-muted font-arabic">{city}</p>}
        </div>
      </div>
    </div>
  );
}
