import { Truck, ShieldCheck, PhoneCall, PackageCheck } from "lucide-react";

const BADGES = [
  { icon: <PackageCheck className="w-5 h-5" />, label: "الدفع عند الاستلام" },
  { icon: <PhoneCall className="w-5 h-5" />, label: "تأكيد عبر الهاتف" },
  { icon: <Truck className="w-5 h-5" />, label: "توصيل في المغرب" },
  { icon: <ShieldCheck className="w-5 h-5" />, label: "ضمان 30 يوم" },
];

export default function TrustStrip() {
  return (
    <div className="bg-surface border-y border-border py-4">
      <div className="max-w-content mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {BADGES.map((b) => (
            <div key={b.label} className="flex items-center gap-2 text-primary">
              {b.icon}
              <span className="font-arabic text-sm font-semibold text-ink">
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
