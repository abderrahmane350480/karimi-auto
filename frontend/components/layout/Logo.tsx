import Link from "next/link";

interface LogoProps {
  compact?: boolean;
}

export default function Logo({ compact }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2 no-underline group flex-shrink-0">
      {/* K circle */}
      <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary-dark transition-colors">
        <span className="text-accent font-bold text-base md:text-lg font-latin leading-none">K</span>
      </div>
      {/* Brand text */}
      <div className="flex flex-col leading-tight">
        <span className="text-ink font-arabic font-bold text-base md:text-lg leading-none whitespace-nowrap">
          كريمي أوطو
        </span>
        {/* English subtitle: hidden on mobile to prevent overflow */}
        {!compact && (
          <span className="hidden md:block text-muted font-latin text-xs leading-none mt-0.5">
            Karimi Auto
          </span>
        )}
      </div>
    </Link>
  );
}
