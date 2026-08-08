"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Logo from "./Logo";

const PRODUCT_LINKS = [
  { href: "/products/cyclone-vacuum-15000pa", label: "مكنسة سيكلون 15000 Pa" },
  { href: "/products/leather-seat-organizer", label: "منظم جلد للكراسي" },
  { href: "/products/digital-tire-inflator-150psi", label: "منفاخ رقمي 150 PSI" },
];

const POLICY_LINKS = [
  { href: "/shipping", label: "سياسة الشحن والتوصيل" },
  { href: "/privacy", label: "سياسة الخصوصية" },
  { href: "/terms", label: "الشروط والأحكام" },
];

const INFO_LINKS = [
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
  { href: "/collections", label: "جميع المنتجات" },
];

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
}

function CollapsibleSection({ title, children }: CollapsibleSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-white/10 md:border-0">
      {/* Mobile toggle header */}
      <button
        className="w-full flex items-center justify-between py-4 md:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-arabic font-bold text-accent text-sm">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-white/60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Desktop: always visible title */}
      <h3 className="hidden md:block font-arabic font-bold text-accent mb-4">{title}</h3>

      {/* Content — hidden on mobile until opened */}
      <div className={`overflow-hidden transition-all duration-200 md:block ${open ? "max-h-96 pb-4" : "max-h-0 md:max-h-none"}`}>
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="max-w-content mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-8">

          {/* Brand — always visible, no collapse */}
          <div className="md:col-span-1 pb-6 md:pb-0 border-b border-white/10 md:border-0 mb-2 md:mb-0">
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-primary font-bold text-lg font-latin">K</span>
                </div>
                <div>
                  <div className="text-white font-arabic font-bold text-lg leading-none">كريمي أوطو</div>
                  <div className="text-white/60 font-latin text-xs leading-none mt-0.5">Karimi Auto</div>
                </div>
              </div>
            </div>
            <p className="text-white/70 text-sm font-arabic leading-relaxed">
              منتجات مختارة بعناية للطوموبيلات فالمغرب، بجودة مضمونة وخلاص حتى توصلك السلعة.
            </p>
            <div className="mt-4 flex flex-col gap-1 text-sm text-white/60 font-arabic">
              <span>الدفع عند الاستلام</span>
              <span>توصيل لجميع مدن المغرب</span>
              <span>تأكيد الطلب عبر الهاتف</span>
              <a
                href="mailto:contact@hakimiauto.site"
                className="font-latin text-white/60 hover:text-accent transition-colors text-xs mt-1"
              >
                contact@hakimiauto.site
              </a>
            </div>
          </div>

          {/* Products — collapsible on mobile */}
          <CollapsibleSection title="المنتجات">
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 hover:text-white text-sm font-arabic transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </CollapsibleSection>

          {/* Info — collapsible on mobile */}
          <CollapsibleSection title="المعلومات">
            <ul className="space-y-2.5">
              {INFO_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 hover:text-white text-sm font-arabic transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </CollapsibleSection>

          {/* Policies + Social — collapsible on mobile */}
          <CollapsibleSection title="السياسات">
            <ul className="space-y-2.5 mb-5">
              {POLICY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 hover:text-white text-sm font-arabic transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-4">
              <a href="#" aria-label="TikTok" className="text-white/60 hover:text-accent transition-colors text-xs font-latin">TikTok</a>
              <a href="#" aria-label="Instagram" className="text-white/60 hover:text-accent transition-colors text-xs font-latin">Instagram</a>
              <a href="#" aria-label="Facebook" className="text-white/60 hover:text-accent transition-colors text-xs font-latin">Facebook</a>
            </div>
          </CollapsibleSection>
        </div>

        <div className="border-t border-white/20 mt-6 md:mt-10 pt-6 text-center text-white/50 text-xs font-arabic">
          <p>© {new Date().getFullYear()} كريمي أوطو — Karimi Auto. جميع الحقوق محفوظة.</p>
          <p className="mt-1">الدفع عند الاستلام | Paiement à la livraison | كنستعملو pixels للإعلانات للتحسين المستمر</p>
        </div>
      </div>
    </footer>
  );
}
