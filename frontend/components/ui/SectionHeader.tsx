interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  center,
}: SectionHeaderProps) {
  return (
    <div className={center ? "text-center" : ""}>
      {badge && (
        <span className="inline-block bg-accent/10 text-accent font-arabic font-semibold text-sm px-3 py-1 rounded-full mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl font-arabic font-bold text-ink leading-snug">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-muted font-arabic text-base leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
      <div className="mt-3 w-12 h-1 bg-accent rounded-full" />
    </div>
  );
}
