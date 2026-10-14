import Link from "next/link";
import ConsultForm from "../../components/ConsultForm";
import MapGate from "../../components/MapGate";
import { safeHref } from "../../lib/url";
import { q } from "../../lib/db";

export default async function Contacts() {
  const rows: any[] = await q("SELECT `key`,value FROM site_settings");
  const s: Record<string, string> = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  const vk = safeHref(s.social_vk);
  const tg = safeHref(s.social_tg);
  const mx = safeHref(s.social_max);
  return (
    <div className="act-page">
      <div className="act-pagehead">
        <div className="container">
          <h1>Контакты</h1>
          <p>{s.address || "680000, г. Хабаровск, ул. Муравьева-Амурского, 4"}</p>
        </div>
      </div>

      <section id="nayti" className="act-scene act-dark v-about">
        <div className="container act-inner">
          <p className="act-eyebrow act-r reveal" style={{ "--i": 0 } as React.CSSProperties}>На связи</p>
          <h2 className="act-title act-r reveal" style={{ "--i": 1 } as React.CSSProperties}>Как нас найти</h2>
          <div className="act-ctas act-r reveal" style={{ "--i": 2 } as React.CSSProperties}>
            <a href={`tel:${(s.phone || "").replace(/[^+\d]/g, "")}`} className="act-btn-white">
              {s.phone || "8 (4212) 32-87-18"}
            </a>
            <a href={`mailto:${s.email || "ksps-priem@mail.ru"}`} className="act-link">
              Написать письмо
              <span className="act-arrow" aria-hidden="true">→</span>
            </a>
          </div>
          <div className="act-text act-r reveal" style={{ "--i": 3 } as React.CSSProperties}>
            <p>{s.hours || "Пн-Чт: 9:00 – 18:00, Пт: 9:00 – 16:20"}{s.fax ? ` · факс ${s.fax}` : ""}</p>
            <p>{s.address || "680000, г. Хабаровск, ул. Муравьева-Амурского, 4"}</p>
          </div>
          <div className="act-facts">
            {vk && <a href={vk} target="_blank" rel="noreferrer" className="act-fact act-fact-link reveal" style={{ "--i": 0 } as React.CSSProperties}>VK</a>}
            {tg && <a href={tg} target="_blank" rel="noreferrer" className="act-fact act-fact-link reveal" style={{ "--i": 0 } as React.CSSProperties}>Telegram</a>}
            {mx && <a href={mx} target="_blank" rel="noreferrer" className="act-fact act-fact-link reveal" style={{ "--i": 1 } as React.CSSProperties}>MAX</a>}
          </div>
        </div>
      </section>

      <section id="kartа" className="act-scene act-light v-org">
        <div className="container act-inner-wide">
          <p className="act-eyebrow act-r reveal" style={{ "--i": 0 } as React.CSSProperties}>Карта</p>
          <h2 className="act-title act-r reveal" style={{ "--i": 1 } as React.CSSProperties}>Муравьёва-Амурского, 4</h2>
          <div className="act-map act-r reveal" style={{ "--i": 2 } as React.CSSProperties}>
            <MapGate />
          </div>
        </div>
      </section>

      <section id="konsult" className="act-scene act-dark v-socpart">
        <div className="container act-inner">
          <p className="act-eyebrow act-r reveal" style={{ "--i": 0 } as React.CSSProperties}>Бесплатно для членов</p>
          <h2 className="act-title act-r reveal" style={{ "--i": 1 } as React.CSSProperties}>Консультация юриста</h2>
          <div className="act-form-card act-r reveal" style={{ "--i": 2 } as React.CSSProperties}>
            <ConsultForm />
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты — ХКООП",
  description: "Адрес, телефоны, почта и бесплатная консультация ХКООП.",
};
