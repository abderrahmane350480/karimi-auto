import { Truck, ShieldCheck, PhoneCall, PackageCheck, Users } from "lucide-react";

const BADGES = [
  { icon: <PackageCheck className="w-5 h-5" />, label: "الدفع عند الاستلام" },
  { icon: <PhoneCall className="w-5 h-5" />, label: "تأكيد هاتفي 24h" },
  { icon: <Truck className="w-5 h-5" />, label: "توصيل 24-72h" },
  { icon: <ShieldCheck className="w-5 h-5" />, label: "ضمان 30 يوم" },
  { icon: <Users className="w-5 h-5" />, label: "+3,200 زبون" },
];

export default function TrustStrip() {
  return (
    <div className="bg-surface border-y border-border py-4">
      <div className="max-w-content mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-5 md:gap-8">
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
