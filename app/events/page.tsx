import PageHero from "../../components/PageHero";
import { q } from "../../lib/db";

export default async function Events() {
  const events: any[] = await q("SELECT id,title,DATE_FORMAT(date,'%Y-%m-%d') AS date,type FROM events ORDER BY date DESC");
  return (
    <>
      <PageHero eyebrow="ХКООП · календарь" title="Мероприятия" sub="Анонсы и события: форумы, мониторинги, горячие линии." />
      <section className="section">
        <div className="grid">
          {events.map((e) => (
            <div key={e.id} className="card doc-card"><div className="card-body">
              <small className="cat">{e.date} · {e.type}</small>
              <h3 style={{ margin: "8px 0" }}>{e.title}</h3>
            </div></div>
          ))}
        </div>
      </section>
    </>
  );
}
