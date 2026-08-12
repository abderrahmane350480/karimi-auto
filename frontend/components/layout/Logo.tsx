import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  compact?: boolean;
}

export default function Logo({ compact }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2 no-underline group flex-shrink-0">
      <Image
        src="/images/logo-header.png"
        alt="Karimi Auto"
        width={40}
        height={40}
        className="w-9 h-9 md:w-10 md:h-10 flex-shrink-0"
        priority
      />
      <div className="flex flex-col leading-tight">
        <span className="text-ink font-arabic font-bold text-base md:text-lg leading-none whitespace-nowrap">
          كريمي أوطو
        </span>
        {!compact && (
          <span className="hidden md:block text-muted font-arabic text-[10px] leading-none mt-0.5">
            خبراء حماية الطوموبيل
          </span>
        )}
      </div>
    </Link>
  );
}
