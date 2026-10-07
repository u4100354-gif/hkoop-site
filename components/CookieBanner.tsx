"use client";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("hkoop-cookie")) setShow(true);
  }, []);
  if (!show) return null;
  return (
    <div className="cookie" role="dialog" aria-label="Cookie">
      <span>
        Наш сайт использует cookie и Яндекс.Метрику. Продолжая, вы соглашаетесь с{" "}
        <a href="/docs">политикой конфиденциальности</a>.
      </span>
      <button
        onClick={() => {
          localStorage.setItem("hkoop-cookie", "1");
          setShow(false);
        }}
      >
        Принять
      </button>
    </div>
  );
}
