import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية — كريمي أوطو",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-arabic font-bold text-ink mb-6">سياسة الخصوصية</h1>
      <div className="space-y-6 font-arabic text-muted leading-relaxed text-sm">
        <section>
          <h2 className="font-bold text-ink mb-2">جمع المعلومات</h2>
          <p>
            كنجمعو فقط المعلومات الضرورية لإتمام الطلب: الاسم ورقم الهاتف. هاد المعلومات
            كتستعمل فقط لتأكيد الطلب والتوصيل.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-ink mb-2">البيكسل والإعلانات</h2>
          <p>
            كنستعملو أدوات تتبع من Meta (Facebook/Instagram)، TikTok، وSnapchat لتحسين
            إعلاناتنا وفهم كيفاش كتستعملو الموقع. هاد الأدوات ممكن تجمع معلومات مجهولة
            الهوية مثل نوع المتصفح وصفحات الزيارة.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-ink mb-2">مشاركة المعلومات</h2>
          <p>
            ما كنشاركوش معلوماتك الشخصية مع أطراف ثالثة بدون إذنك، ما عدا ما هو ضروري
            لتوصيل طلبك.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-ink mb-2">تواصل معنا</h2>
          <p>
            إلا كان عندك أي سؤال على الخصوصية، تاصل بينا عبر صفحة التواصل.
          </p>
        </section>
      </div>
    </div>
  );
}
