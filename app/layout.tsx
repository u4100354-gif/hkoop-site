import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ViProvider from "../components/ViProvider";
import CookieBanner from "../components/CookieBanner";
import MetricsGate from "../components/MetricsGate";
import ScrollFx from "../components/ScrollFx";

export const metadata: Metadata = {
  title: "ХКООП — Хабаровское краевое объединение организаций профсоюзов",
  description: "Официальный сайт Союза ХКООП: новости, документы, деятельность, книга почёта, бесплатная консультация.",
};

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-main",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ym = process.env.NEXT_PUBLIC_YM_ID ?? "";

  return (
    <html lang="ru" suppressHydrationWarning className={manrope.variable}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a className="skip" href="#content">Перейти к содержанию</a>
        <ViProvider />
        <Header />
        <main className="container" id="content">{children}</main>
        <Footer />
        <CookieBanner />
        <ScrollFx />
        <MetricsGate ym={ym} />
      </body>
    </html>
  );
}