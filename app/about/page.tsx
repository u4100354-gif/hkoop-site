import Link from "next/link";
import ActSceneNav from "../../components/ActSceneNav";

export default function About() {
  return (
    <div className="act-page">
      <ActSceneNav scenes={[
        { id: "intro", label: "О Союзе", accent: "#3aa655" },
        { id: "cifry", label: "В цифрах", accent: "#f0c264" },
        { id: "organy", label: "Органы", accent: "#9ae6b4" },
      ]} />
      <div className="act-pagehead">
        <div className="container">
          <h1>О нас</h1>
          <p>Союз «Хабаровское краевое объединение организаций профсоюзов» — с 11 декабря 1948 года.</p>
        </div>
      </div>

      <section id="intro" className="act-scene act-dark v-about">
          <div className="act-heroimg" aria-hidden="true" />
        <div className="container act-inner">
          <p className="act-eyebrow act-r reveal" style={{ "--i": 0 } as React.CSSProperties}>Профобъединение</p>
          <h2 className="act-title act-r reveal" style={{ "--i": 1 } as React.CSSProperties}>77 лет на страже прав трудящихся</h2>
          <div className="act-ctas act-r reveal" style={{ "--i": 2 } as React.CSSProperties}>
            <Link href="/activity" className="act-btn-white">
              Наши направления
              <span className="act-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/docs" className="act-link">
              Устав и документы
              <span className="act-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="act-text act-r reveal" style={{ "--i": 4 } as React.CSSProperties}>
            <p>
              Союз «ХКООП» — добровольное объединение организаций общероссийских и
              межрегиональных профсоюзов, действующих на территории Хабаровского края.
              Независимы от органов власти, работодателей и политических партий;
              представляем интересы работников и их семей.
            </p>
            <p>
              Председатель Профобъединения — Галина Анатольевна Кононенко.
              Профобъединение — членская организация Федерации независимых профсоюзов
              России (ФНПР) и представляет её в Хабаровском крае.
            </p>
          </div>
          <div className="act-facts">
            <span className="act-fact reveal" style={{ "--i": 0 } as React.CSSProperties}>С 11.12.1948</span>
            <span className="act-fact reveal" style={{ "--i": 0 } as React.CSSProperties}>Член ФНПР</span>
            <span className="act-fact reveal" style={{ "--i": 1 } as React.CSSProperties}>Хабаровск, ул. Муравьёва-Амурского, 4</span>
          </div>
        </div>
      </section>

      <section id="cifry" className="act-scene act-dark v-socpart">
        <div className="container act-inner act-inner-nums">
          <p className="act-eyebrow act-r reveal" style={{ "--i": 0 } as React.CSSProperties}>ХКООП в цифрах</p>
          <h2 className="act-title act-r reveal" style={{ "--i": 1 } as React.CSSProperties}>Сила — в единстве</h2>
          <div className="act-nums act-r reveal" style={{ "--i": 2 } as React.CSSProperties}>
            <div className="act-num-item"><b>77</b><span>лет истории</span></div>
            <div className="act-num-item"><b>20</b><span>членских организаций</span></div>
            <div className="act-num-item"><b>677</b><span>первичных профсоюзных организаций</span></div>
            <div className="act-num-item"><b>102 576</b><span>членов профсоюза</span></div>
            <div className="act-num-item"><b>7</b><span>координационных советов в муниципалитетах</span></div>
          </div>
          <div className="act-text act-r reveal" style={{ "--i": 3 } as React.CSSProperties}>
            <p>Данные на 1 января 2026 года: 14 краевых, 4 территориальные, 1 бассейновая и 1 первичная организация в составе Союза, а также 9 городских и районных организаций профсоюзов.</p>
          </div>
        </div>
      </section>

      <section id="organy" className="act-scene act-dark v-molodezh">
        <div className="container act-inner">
          <p className="act-eyebrow act-r reveal" style={{ "--i": 0 } as React.CSSProperties}>Структура</p>
          <h2 className="act-title act-r reveal" style={{ "--i": 1 } as React.CSSProperties}>Органы Профобъединения</h2>
          <div className="act-ctas act-r reveal" style={{ "--i": 2 } as React.CSSProperties}>
            <Link href="/docs" className="act-btn-white">
              Документы органов
              <span className="act-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="act-branches act-r reveal" style={{ "--i": 3 } as React.CSSProperties}>
            <svg className="act-branch-svg" viewBox="0 0 1000 110" preserveAspectRatio="none" aria-hidden="true">
              <g fill="none" stroke="rgba(154,230,180,.55)" strokeWidth="2" vectorEffect="non-scaling-stroke">
                <path d="M500 0 C500 42, 125 42, 125 96" />
                <path d="M500 0 C500 42, 375 42, 375 96" />
                <path d="M500 0 C500 42, 625 42, 625 96" />
                <path d="M500 0 C500 42, 875 42, 875 96" />
              </g>
              <g fill="rgba(154,230,180,.75)">
                <polygon points="119,96 131,96 125,106" />
                <polygon points="369,96 381,96 375,106" />
                <polygon points="619,96 631,96 625,106" />
                <polygon points="869,96 881,96 875,106" />
              </g>
            </svg>
            <div className="act-orggrid">
              <div className="act-orgcard"><b>Конференция</b><span>Высший орган; направления 2025–2030</span></div>
              <div className="act-orgcard"><b>Совет</b><span>Руководство между конференциями</span></div>
              <div className="act-orgcard"><b>Президиум</b><span>Оперативные решения</span></div>
              <div className="act-orgcard"><b>КРК</b><span>Контроль финансов и устава</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О нас — ХКООП",
  description: "История, структура и цифры Хабаровского краевого объединения организаций профсоюзов с 1948 года.",
};
