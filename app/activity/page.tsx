import PageHero from "../../components/PageHero";

const dirs = [
  { id: "pravo", t: "Правозащита", d: "Горячая линия, мониторинг рынка труда, бесплатные консультации." },
  { id: "ohrana", t: "Охрана труда", d: "Рекомендации ФНПР, расследования несчастных случаев." },
  { id: "socpart", t: "Социальное партнёрство", d: "Трёхстороннее соглашение 2026–2028, генсоглашение." },
  { id: "molodezh", t: "Молодёжный совет", d: "Форум «Профмолодежь Приамурья», проекты." },
  { id: "mezhdunar", t: "Международное сотрудничество", d: "Харбин, Федерация профсоюзов Хэйлунцзян." },
  { id: "org", t: "Организационная работа", d: "Планы, конференции, координационные советы." },
];

export default function Activity() {
  return (
    <>
      <PageHero eyebrow="ХКООП · направления" title="Деятельность" sub="Шесть направлений: от горячей линии до международного сотрудничества." />
      <section className="section">
        <div className="grid">
          {dirs.map((x) => (
            <div key={x.id} className="card doc-card"><div className="card-body">
              <strong>{x.t}</strong>
              <p><small>{x.d}</small></p>
              <a href="/news">{x.t === "Правозащита" ? "Горячая линия →" : "Новости направления →"}</a>
            </div></div>
          ))}
        </div>
      </section>
    </>
  );
}
