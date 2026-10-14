import Link from "next/link";

export default function About() {
  return (
    <div className="act-page">
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
        <div className="container act-inner">
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
          <div className="act-flist act-r reveal" style={{ "--i": 3 } as React.CSSProperties}>
            <span className="act-fact"><b>Конференция</b> — высший орган; направления 2025–2030</span>
            <span className="act-fact"><b>Совет</b> — руководит между конференциями</span>
            <span className="act-fact"><b>Президиум</b> — оперативные решения</span>
            <span className="act-fact"><b>КРК</b> — контроль финансов и устава</span>
          </div>
        </div>
      </section>

      <section id="napravleniya" className="act-scene act-light v-org">
        <div className="container act-inner">
          <p className="act-eyebrow act-r reveal" style={{ "--i": 0 } as React.CSSProperties}>2025–2030</p>
          <h2 className="act-title act-r reveal" style={{ "--i": 1 } as React.CSSProperties}>Основные направления</h2>
          <div className="act-ctas act-r reveal" style={{ "--i": 2 } as React.CSSProperties}>
            <Link href="/activity" className="act-link">
              Все направления подробно
              <span className="act-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="act-facts">
            <span className="act-fact reveal" style={{ "--i": 0 } as React.CSSProperties}>Правозащита</span>
            <span className="act-fact reveal" style={{ "--i": 0 } as React.CSSProperties}>Охрана труда</span>
            <span className="act-fact reveal" style={{ "--i": 1 } as React.CSSProperties}>Социальное партнёрство</span>
            <span className="act-fact reveal" style={{ "--i": 2 } as React.CSSProperties}>Молодёжная политика</span>
            <span className="act-fact reveal" style={{ "--i": 3 } as React.CSSProperties}>Международное сотрудничество</span>
            <span className="act-fact reveal" style={{ "--i": 4 } as React.CSSProperties}>Организационная работа</span>
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
