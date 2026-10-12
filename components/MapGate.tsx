"use client";
import { useEffect, useState } from "react";
import { readConsent } from "../lib/consent";

const MAP_SRC =
  "https://yandex.ru/map-widget/v1/?ll=135.0711%2C48.4739&z=16&pt=135.0711%2C48.4739%2Cpm2rdm&text=%D0%A5%D0%B0%D0%B1%D0%B0%D1%80%D0%BE%D0%B2%D1%81%D0%BA";
const MAP_LINK = "https://yandex.ru/maps/?ll=135.0711%2C48.4739&z=16";

// Карта Яндекса грузится только после согласия (152-ФЗ): до этого —
// статическая ссылка без единого запроса к yandex.ru.
export default function MapGate() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const sync = () => setOk(readConsent() === "granted");
    sync();
    window.addEventListener("hkoop-consent", sync);
    return () => window.removeEventListener("hkoop-consent", sync);
  }, []);
  if (!ok)
    return (
      <div style={{ padding: 16 }}>
        <p style={{ margin: "0 0 8px" }}>Карта отключена до вашего согласия на cookies.</p>
        <a href={MAP_LINK} target="_blank" rel="noreferrer">
          Открыть карту на Яндекс.Картах →
        </a>
      </div>
    );
  return <iframe src={MAP_SRC} width="100%" height="300" frameBorder="0" title="Карта: ХКООП, Хабаровск" />;
}
