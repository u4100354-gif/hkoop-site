import PageHero from "../../components/PageHero";

export default function About() {
  return (
    <>
      <PageHero eyebrow="ХКООП · с 1948 года" title="О нас" sub="Союз «Хабаровское краевое объединение организаций профсоюзов» — 77 лет на страже прав трудящихся." />
      <section className="section">
        <h2>История</h2>
        <div className="card"><div className="card-body">
          <p>Хабаровское краевое объединение организаций профсоюзов ведёт историю с <b>11 декабря 1948 года</b>. Сегодня это союз членских организаций, координационных советов и первичек по всему краю.</p>
          <p><small>Точные цифры членских организаций и членов профсоюза на 01.01.2026 — запросить у руководства.</small></p>
        </div></div>
      </section>
      <section className="section">
        <h2>Органы и конференция</h2>
        <div className="grid">
          <div className="card"><div className="card-body"><strong>Конференция</strong><div><small>Высший орган, направления 2025–2030</small></div></div></div>
          <div className="card"><div className="card-body"><strong>Совет</strong><div><small>Руководство между конференциями</small></div></div></div>
          <div className="card"><div className="card-body"><strong>Президиум</strong><div><small>Оперативные решения</small></div></div></div>
          <div className="card"><div className="card-body"><strong>Контрольно-ревизионная комиссия</strong><div><small>Контроль финансов и устава</small></div></div></div>
        </div>
      </section>
      <section className="section">
        <h2>Основные направления 2025–2030</h2>
        <div className="card"><div className="card-body">
          <p>Правозащита, охрана труда, соцпартнёрство, молодёжная политика, международное сотрудничество, оргработа.</p>
          <a className="btn btn-ghost" href="/docs">Читать документы →</a>
        </div></div>
      </section>
    </>
  );
}
