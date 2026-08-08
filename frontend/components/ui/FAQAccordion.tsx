"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
      {faqs.map((faq, idx) => (
        <div key={idx} className="bg-surface">
          <button
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-right font-arabic font-semibold text-ink hover:bg-bg transition-colors"
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            aria-expanded={openIdx === idx}
          >
            <span>{faq.q}</span>
            <ChevronDown
              className={`w-4 h-4 text-muted flex-shrink-0 transition-transform ${
                openIdx === idx ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIdx === idx && (
            <div className="px-5 pb-4 text-muted font-arabic text-sm leading-relaxed">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
