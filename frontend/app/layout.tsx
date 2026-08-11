import type { Metadata } from "next";
import { Cairo, Tajawal, Inter } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import CheckoutModal from "@/components/checkout/CheckoutModal";
import UpsellModal from "@/components/checkout/UpsellModal";
import TrackingInit from "@/components/tracking/TrackingInit";
import RecentOrderToast from "@/components/ui/RecentOrderToast";
import StoreShell from "@/components/layout/StoreShell";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "كريمي أوطو — خبراء حماية الطوموبيل فالمغرب",
  description:
    "متخصصون فحماية السيارات: واقي الشمس تيتانيوم، سبراي السيراميك نانو، وجهاز GPS ضد السرقة. منتجات مختبرة للمناخ المغربي. الدفع عند الاستلام.",
  keywords: ["كريمي أوطو", "حماية الطوموبيل", "واقي الشمس", "سبراي السيراميك", "GPS ضد السرقة", "حماية السيارة", "المغرب", "الدفع عند الاستلام"],
  openGraph: {
    title: "كريمي أوطو — خبراء حماية الطوموبيل فالمغرب",
    description: "متخصصون فحماية السيارات من الحرارة، الخدوش، والسرقة — منتجات مختبرة للمناخ المغربي. الدفع عند الاستلام.",
    url: "https://karimiauto.site",
    siteName: "Karimi Auto",
    locale: "ar_MA",
    type: "website",
  },
  metadataBase: new URL("https://karimiauto.site"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} ${tajawal.variable} ${inter.variable} font-arabic`}
      >
        <StoreShell>
          <AnnouncementBar />
          <Header />
        </StoreShell>
        <main>{children}</main>
        <StoreShell>
          <Footer />
          <CartDrawer />
          <CheckoutModal />
          <UpsellModal />
          <RecentOrderToast />
          <TrackingInit />
        </StoreShell>
      </body>
    </html>
  );
}
