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
  title: "كريمي أوطو — حماية الطوموبيل الكاملة بالمغرب",
  description:
    "3 منتجات ذكية لحماية طوموبيلتك: واقي الشمس التيتانيوم، سبراي السيراميك، وجهاز GPS ضد السرقة. الدفع عند الاستلام.",
  keywords: ["كريمي أوطو", "واقي الشمس", "سبراي السيراميك", "GPS ضد السرقة", "حماية السيارة", "المغرب", "الدفع عند الاستلام"],
  openGraph: {
    title: "كريمي أوطو — حماية الطوموبيل الكاملة بالمغرب",
    description: "3 منتجات ذكية كتحمي طوموبيلتك من الحرارة، الخدوش، والسرقة — الدفع عند الاستلام.",
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
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        {/* Global interactive components */}
        <CartDrawer />
        <CheckoutModal />
        <UpsellModal />
        {/* Recent order social proof toasts */}
        <RecentOrderToast />
        {/* Deferred pixel initialization — loads after page is interactive */}
        <TrackingInit />
      </body>
    </html>
  );
}
