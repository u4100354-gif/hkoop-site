"use client";
import { useEffect, useState } from "react";
import { readConsent, writeConsent } from "../lib/consent";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!readConsent()) setShow(true);
    const onChange = () => setShow(!readConsent());
    window.addEventListener("hkoop-consent", onChange);
    return () => window.removeEventListener("hkoop-consent", onChange);
  }, []);
  if (!show) return null;
  return (
    <div className="cookie" role="dialog" aria-label="Cookie">
      <span>
        Наш сайт использует cookie, Яндекс.Метрику и карты. Продолжая, вы соглашаетесь с{" "}
        <a href="/policy">политикой конфиденциальности</a>.
      </span>
      <span style={{ display: "flex", gap: 8 }}>
        <button onClick={() => writeConsent("denied")}>Отклонить</button>
        <button onClick={() => writeConsent("granted")}>Принять</button>
      </span>
    </div>
  );
}
