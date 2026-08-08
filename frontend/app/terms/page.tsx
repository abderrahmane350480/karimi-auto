import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الشروط والأحكام — كريمي أوطو",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-arabic font-bold text-ink mb-6">الشروط والأحكام</h1>
      <div className="space-y-6 font-arabic text-muted leading-relaxed text-sm">
        <section>
          <h2 className="font-bold text-ink mb-2">الطلب والتأكيد</h2>
          <p>
            بعد تقديم الطلب، غادي يتاصل بك فريق كريمي أوطو باش يأكد التفاصيل قبل الإرسال.
            الطلب ما يعتبرش مؤكدا حتى يتم التأكيد الهاتفي.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-ink mb-2">الأسعار والدفع</h2>
          <p>
            الأسعار محددة بالدرهم المغربي (MAD). الدفع يتم نقدا عند استلام البضاعة.
            ما كاينش دفع إلكتروني في هذه المرحلة.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-ink mb-2">التوصيل</h2>
          <p>
            كنوصلو لجميع مدن المغرب. مدة التوصيل تتراوح بين 2-5 أيام عمل بعد التأكيد.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-ink mb-2">الإرجاع والتبديل</h2>
          <p>
            إلا وصلك المنتج فيه عيب أو خطأ، تاصل بينا خلال 48 ساعة من الاستلام باش
            نحلو المشكل. ما كنقبلوش الإرجاع بعد 48 ساعة إلا في حالات خاصة.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-ink mb-2">مسؤولية الزبون</h2>
          <p>
            المرجو التأكيد فقط إذا كنت ناوي فعلا تستلم الطلبية. عدم الاستلام بدون سبب
            وجيه قد يؤثر على إمكانية الطلب مستقبلا.
          </p>
        </section>
      </div>
    </div>
  );
}
