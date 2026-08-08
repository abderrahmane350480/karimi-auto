import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الشحن والتوصيل | كريمي أوطو",
  description: "معلومات الشحن والتوصيل لجميع مدن المغرب.",
};

export default function ShippingPage() {
  return (
    <div className="max-w-content mx-auto px-4 py-12 md:py-20 min-h-[60vh]">
      <div className="max-w-3xl mx-auto bg-surface rounded-2xl p-6 md:p-10 shadow-sm border border-border">
        <h1 className="font-arabic font-bold text-3xl text-ink mb-6">
          سياسة الشحن والتوصيل
        </h1>
        <div className="prose prose-arabic text-ink prose-emerald">
          <p>
            في كريمي أوطو، نحرص على توصيل طلباتكم بأسرع وقت ممكن وبأعلى معايير الجودة.
          </p>

          <h2 className="font-bold text-xl mt-8 mb-4 text-primary">مدة التوصيل</h2>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>
              <strong>المدن الكبرى:</strong> من يوم إلى يومين عمل (1-2 أيام).
            </li>
            <li>
              <strong>باقي المدن والمناطق:</strong> من يومين إلى 5 أيام عمل (2-5 أيام).
            </li>
          </ul>

          <h2 className="font-bold text-xl mt-8 mb-4 text-primary">آلية التوصيل</h2>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>
              بعد إتمام الطلب، سيقوم فريقنا بالاتصال بكم هاتفياً خلال 24 ساعة لتأكيد الطلب وتحديد موعد التوصيل.
            </li>
            <li>
              يرجى إبقاء هاتفكم متاحاً للرد على مندوب التوصيل لتفادي أي تأخير.
            </li>
          </ul>

          <h2 className="font-bold text-xl mt-8 mb-4 text-primary">تكلفة الشحن</h2>
          <p>
            تتم إضافة تفاصيل الشحن أثناء عملية الشراء وتأكيد الطلب. نسعى دائماً لتقديم أفضل تسعيرة توصيل أو شحن مجاني للمدن الكبرى.
          </p>

          <h2 className="font-bold text-xl mt-8 mb-4 text-primary">الاستلام والدفع</h2>
          <p>
            نوفر خدمة <strong>الدفع عند الاستلام</strong> (Cash on Delivery). لا تدفع أي مبلغ حتى تستلم منتجك بين يديك وتتأكد منه.
          </p>
        </div>
      </div>
    </div>
  );
}