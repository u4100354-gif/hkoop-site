import Link from "next/link";
import PartnersStrip from "../../components/PartnersStrip";
import { q } from "../../lib/db";

export default async function Partners() {
  const partners: any[] = await q("SELECT * FROM partners ORDER BY name");
  return (
    <div className="act-page">
      <div className="act-pagehead">
        <div className="container">
          <h1>Партнёры</h1>
          <p>Организации, с которыми ХКООП работает в постоянном партнёрстве.</p>
        </div>
      </div>

      <section id="intro" className="act-scene act-dark v-pravo">
        <div className="container act-inner">
          <p className="act-eyebrow act-r reveal" style={{ "--i": 0 } as React.CSSProperties}>Партнёрство</p>
          <h2 className="act-title act-r reveal" style={{ "--i": 1 } as React.CSSProperties}>Один — на весь край</h2>
          <div className="act-ctas act-r reveal" style={{ "--i": 2 } as React.CSSProperties}>
            <Link href="/contacts" className="act-link">
              Связаться с нами
              <span className="act-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="act-text act-r reveal" style={{ "--i": 3 } as React.CSSProperties}>
            <p>
              ХКООП объединяет профсоюзные организации края и работает с Федерацией
              независимых профсоюзов России, правительством Хабаровского края, фондами,
              вузами и надзорными органами. Партнёрство — это совместные проекты,
              социальные программы и защита интересов работников.
            </p>
          </div>
          <div className="act-facts">
            <span className="act-fact reveal" style={{ "--i": 0 } as React.CSSProperties}>ФНПР</span>
            <span className="act-fact reveal" style={{ "--i": 0 } as React.CSSProperties}>Правительство края</span>
            <span className="act-fact reveal" style={{ "--i": 1 } as React.CSSProperties}>Фонды и вузы</span>
          </div>
        </div>
      </section>

      <section id="spisok" className="act-scene act-light v-org">
        <div className="container act-inner-wide">
          <p className="act-eyebrow act-r reveal" style={{ "--i": 0 } as React.CSSProperties}>Список</p>
          <h2 className="act-title act-r reveal" style={{ "--i": 1 } as React.CSSProperties}>Наши партнёры</h2>
          <div className="act-partners act-r reveal" style={{ "--i": 2 } as React.CSSProperties}>
            <PartnersStrip items={partners} />
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Партнёры — ХКООП",
  description: "Организации-партнёры ХКООП: ФНПР, фонды, вузы, надзорные органы.",
};
