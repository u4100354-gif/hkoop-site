import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ViProvider from "../components/ViProvider";
import CookieBanner from "../components/CookieBanner";
import ScrollFx from "../components/ScrollFx";

export const metadata: Metadata = {
  title: "ХКООП — Хабаровское краевое объединение организаций профсоюзов",
  description: "Официальный сайт Союза ХКООП: новости, документы, деятельность, книга почёта, бесплатная консультация.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ym = process.env.NEXT_PUBLIC_YM_ID;
  return (
    <html lang="ru">
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <ViProvider />
        <Header />
        <main className="container">{children}</main>
        <Footer />
        <CookieBanner />
        <ScrollFx />
        {ym && (
          <>
            <script dangerouslySetInnerHTML={{ __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${ym},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true});` }} />
            <noscript><div><img src={`https://mc.yandex.ru/watch/${ym}`} style={{ position: "absolute", left: "-9999px" }} alt="" /></div></noscript>
          </>
        )}
      </body>
    </html>
  );
}
