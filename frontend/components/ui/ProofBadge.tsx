import { ShieldCheck } from "lucide-react";

interface ProofBadgeProps {
  text: string;
  icon?: React.ReactNode;
  variant?: "green" | "gold";
}

export default function ProofBadge({
  text,
  icon,
  variant = "green",
}: ProofBadgeProps) {
  const colors =
    variant === "gold"
      ? "bg-accent/10 text-accent border-accent/30"
      : "bg-success/10 text-success border-success/30";

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-arabic font-semibold px-2.5 py-1 rounded-full border ${colors}`}
    >
      {icon ?? <ShieldCheck className="w-3.5 h-3.5" />}
      {text}
    </span>
  );
}
