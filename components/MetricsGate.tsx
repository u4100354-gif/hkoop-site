"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { readConsent } from "../lib/consent";

// Метрика включается только после согласия и только при числовом ID счётчика.
export default function MetricsGate({ ym }: { ym: string | undefined }) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const sync = () => setOk(readConsent() === "granted");
    sync();
    window.addEventListener("hkoop-consent", sync);
    return () => window.removeEventListener("hkoop-consent", sync);
  }, []);
  if (!ok || !ym || !/^\d+$/.test(ym)) return null;
  return (
    <>
      <Script
        src="https://mc.yandex.ru/metrika/tag.js"
        strategy="afterInteractive"
      />
      <Script
        id="ym-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `ym(${ym},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true});`,
        }}
      />
    </>
  );
}
