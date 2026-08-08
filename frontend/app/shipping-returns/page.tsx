import type { Metadata } from "next";
import { Truck, ShieldCheck, Clock, PhoneCall } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "التوصيل والاسترجاع — كريمي أوطو",
};

export default function ShippingReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <SectionHeader
        badge="الخدمات"
        title="التوصيل والاسترجاع"
        subtitle="كل ما تحتاج تعرفو على التوصيل وسياسة التبديل"
      />

      <div className="mt-10 space-y-6">
        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Truck className="w-6 h-6 text-primary" />
            <h2 className="font-arabic font-bold text-ink text-lg">التوصيل</h2>
          </div>
          <ul className="space-y-2 font-arabic text-muted text-sm leading-relaxed">
            <li>• كنوصلو لجميع مدن وقرى المغرب</li>
            <li>• مدة التوصيل: 2-5 أيام عمل بعد التأكيد الهاتفي</li>
            <li>• ثمن التوصيل: محدد حسب المدينة</li>
            <li>• التوصيل عبر شركة نقل موثوقة</li>
          </ul>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-6 h-6 text-success" />
            <h2 className="font-arabic font-bold text-ink text-lg">الدفع عند الاستلام</h2>
          </div>
          <p className="font-arabic text-muted text-sm leading-relaxed">
            ما كتخلص حتى توصلك السلعة وتشوفها بعينك. غادي يتاصل بك الفريق قبل الإرسال
            باش يأكد العنوان والطلب.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-primary" />
            <h2 className="font-arabic font-bold text-ink text-lg">التبديل والإرجاع</h2>
          </div>
          <ul className="space-y-2 font-arabic text-muted text-sm leading-relaxed">
            <li>• إلا وصلك المنتج فيه عيب أو خطأ: تاصل بينا خلال 48 ساعة</li>
            <li>• كنبدلو المنتج بدون تكاليف إضافية</li>
            <li>• ما كنقبلوش الإرجاع إلا في حالة عيب أو خطأ من جهتنا</li>
          </ul>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <PhoneCall className="w-6 h-6 text-primary" />
            <h2 className="font-arabic font-bold text-ink text-lg">خدمة الزبناء</h2>
          </div>
          <p className="font-arabic text-muted text-sm leading-relaxed">
            الفريق متاح من الاثنين للسبت 9h-20h عبر الهاتف أو WhatsApp لأي سؤال أو مشكل.
          </p>
        </div>
      </div>
    </div>
  );
}
