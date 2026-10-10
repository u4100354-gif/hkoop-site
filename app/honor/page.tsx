import PageHero from "../../components/PageHero";
import { safeImgSrc } from "../../lib/url";
import { q } from "../../lib/db";

export default async function Honor() {
  const honor: any[] = await q("SELECT * FROM honor ORDER BY fio");
  return (
    <>
      <PageHero eyebrow="ХКООП · признание" title="Книга Почёта" sub="Галерея профилей ветеранов и активистов профсоюзного движения." />
      <section className="section">
        <div className="grid">
          {honor.map((h) => (
            <article key={h.id} className="card news-card honor-card">
              <div className="thumb">
                {safeImgSrc(h.photo) ? <img src={safeImgSrc(h.photo)!} alt={h.fio} loading="lazy" /> : <div style={{ height: 170, background: "linear-gradient(135deg,#252e4f,#3a4670)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 48 }}>★</div>}
                <span className="date-badge">{h.year}</span>
              </div>
              <div className="card-body">
                <h3>{h.fio}</h3>
                <p><small>{h.title || h.text}</small></p>
              </div>
            </article>
          ))}
          {honor.length === 0 && <p>Пока пусто.</p>}
        </div>
      </section>
    </>
  );
}
