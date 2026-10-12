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
              <a href={`/honor/${h.id}`} className="thumb">
                {safeImgSrc(h.photo) ? <img src={safeImgSrc(h.photo)!} alt={h.fio} loading="lazy" width={400} height={250} /> : <div style={{ height: "100%", background: "linear-gradient(135deg,#252e4f,#3a4670)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 48 }}>★</div>}
                <span className="date-badge">{h.year}</span>
              </a>
              <div className="card-body">
                <h3><a href={`/honor/${h.id}`}>{h.fio}</a></h3>
                <p><small>{h.title || "Книга Почёта ХКООП"}</small></p>
                <div className="btn-row"><a className="btn btn-ghost" href={`/honor/${h.id}`}>Подробнее →</a></div>
              </div>
            </article>
          ))}
          {honor.length === 0 && <p>Пока пусто.</p>}
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Книга Почёта — ХКООП",
  description: "Ветераны и активисты профсоюзного движения Хабаровского края.",
};
