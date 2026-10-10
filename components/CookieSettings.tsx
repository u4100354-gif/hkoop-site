"use client";
import { clearConsent } from "../lib/consent";

export default function CookieSettings() {
  return (
    <button
      type="button"
      onClick={clearConsent}
      style={{ background: "none", border: 0, padding: 0, cursor: "pointer", font: "inherit", color: "#fff", textDecoration: "underline" }}
      aria-label="Настройки cookies: показать баннер заново"
    >
      Настройки cookies
    </button>
  );
}
