import type { Metadata } from "next";
import { PhoneCall, MessageCircle, Clock, Mail } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "تواصل معنا — كريمي أوطو | خبراء حماية الطوموبيل",
  description: "تواصل مع فريق كريمي أوطو — خبراء حماية الطوموبيل فالمغرب.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-primary text-white py-16 px-4">
        <div className="max-w-content mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-arabic font-bold mb-3">
            تواصل معنا
          </h1>
          <p className="text-white/80 font-arabic text-lg">
            فريق كريمي أوطو هنا باش يجاوبك على أي سؤال ويعاونك فأي وقت.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact info */}
            <div>
              <SectionHeader badge="تواصل" title="كيفاش تتاصل بينا" />
              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-4 bg-surface border border-border rounded-2xl p-5">
                  <MessageCircle className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-arabic font-bold text-ink mb-1">WhatsApp</h3>
                    <p className="font-arabic text-muted text-sm">
                      {/* Replace with real WhatsApp number before launch */}
                      <a href="https://wa.me/212600000000" className="text-primary hover:underline">
                        +212 600 000 000
                      </a>
                    </p>
                    <p className="font-arabic text-muted text-xs mt-1">
                      رقم placeholder — يُستبدل قبل الإطلاق
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-surface border border-border rounded-2xl p-5">
                  <PhoneCall className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-arabic font-bold text-ink mb-1">الهاتف</h3>
                    <p className="font-arabic text-muted text-sm">
                      {/* Replace with real phone before launch */}
                      <a href="tel:+212600000000" className="text-primary hover:underline">
                        +212 600 000 000
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-surface border border-border rounded-2xl p-5">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-arabic font-bold text-ink mb-1">البريد الإلكتروني</h3>
                    <a
                      href="mailto:contact@karimiauto.site"
                      className="font-latin text-primary hover:underline text-sm"
                    >
                      contact@karimiauto.site
                    </a>
                    <p className="font-arabic text-muted text-xs mt-1">
                      كنجاوبو خلال 24 ساعة
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-surface border border-border rounded-2xl p-5">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-arabic font-bold text-ink mb-1">ساعات الخدمة</h3>
                    <p className="font-arabic text-muted text-sm">
                      من الاثنين إلى السبت، 9h إلى 20h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <SectionHeader badge="رسالة" title="ابعث لنا رسالة" />
              {/*
                v1: Contact form — submissions not wired to backend yet.
                Wire to POST /api/contact when backend endpoint is added.
              */}
              <form className="mt-8 flex flex-col gap-4" action="mailto:contact@karimiauto.site" method="GET">
                <div>
                  <label className="block font-arabic font-semibold text-sm text-ink mb-1">
                    الاسم
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="اسمك"
                    className="w-full border border-border rounded-xl px-4 py-3 font-arabic text-ink bg-bg focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block font-arabic font-semibold text-sm text-ink mb-1">
                    الهاتف
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="0612345678"
                    dir="ltr"
                    className="w-full border border-border rounded-xl px-4 py-3 font-latin text-ink bg-bg focus:outline-none focus:border-primary text-left"
                  />
                </div>
                <div>
                  <label className="block font-arabic font-semibold text-sm text-ink mb-1">
                    الرسالة
                  </label>
                  <textarea
                    name="body"
                    placeholder="سؤالك أو ملاحظتك..."
                    rows={4}
                    className="w-full border border-border rounded-xl px-4 py-3 font-arabic text-ink bg-bg focus:outline-none focus:border-primary resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-arabic font-bold py-4 rounded-cta transition-colors"
                >
                  ابعث الرسالة
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
