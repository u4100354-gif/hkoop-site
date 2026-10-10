import Slider from "../components/Slider";
import ConsultForm from "../components/ConsultForm";
import PartnersStrip from "../components/PartnersStrip";
import Counter from "../components/Counter";
import { q, parseTags } from "../lib/db";

const catLabels: Record<string, string> = {
  molodezh: "Молодёжь",
  "ohrana-truda": "Охрана труда",
  novosti: "Новости",
  mezhdunarodnoe: "Международное",
  podderzhka: "Поддержка",
};

const typeLabels: Record<string, string> = {
  plan: "Планы",
  soglashenie: "Соглашения",
  program: "Программы",
  policy: "Политика",
};

const newsImages: Record<string, string> = {  "forum-profmlodezh-2026": "/images/i-1.webp",
  "fnpr-grubaya-neostorozhnost": "/images/96ef99bb-f1ef-47a1-a6ee-9d558c479bbd.jpg",
  "den-flaga-2026": "/images/год3.png",
  "harbin-vstrecha-2026": "/images/ccfaee06-8db0-44ca-8005-1033f511a98e.jpg",
  "plany-sentyabr": "/images/banners/banner-1.JPG",
  "svo-spravochnik": "/images/Asset-13.png",
};

export default async function Home() {
  const news: any[] = await q("SELECT id,title,DATE_FORMAT(date,'%Y-%m-%d') AS date,category,excerpt FROM news ORDER BY date DESC LIMIT 4");
  const docs: any[] = await q("SELECT id,title,type,year,file_local,file_old,old_url FROM documents ORDER BY year DESC LIMIT 4");
  const partners: any[] = await q("SELECT * FROM partners ORDER BY name");
  const docHref = (d: any) => d.file_local || d.file_old || (d.old_url ? `https://habprof.ru${d.old_url}` : "/docs");
  return (
    <>
      <Slider />

      <div className="main-grid reveal">
        <section className="section" style={{ margin: 0 }}>
          <div className="section-head">
            <h2>Новости</h2>
            <a href="/news" className="more">Все новости →</a>
          </div>
          <div className="grid">
            {(news as any[]).slice(0, 4).map((n) => (
              <article key={n.id} className="card news-card">
                <div className="thumb">
                  <img src={newsImages[n.id] || "/images/i-1.webp"} alt="" loading="lazy" />
                  <span className="date-badge">{n.date}</span>
                </div>
                <div className="card-body">
                  <small className="cat">{catLabels[n.category] || n.category}</small>
                  <h3><a href={`/news/${n.id}`}>{n.title}</a></h3>
                  <p>{n.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <aside className="side-list">
          <strong>Быстрые ссылки</strong>
          <a href="/docs">Наши планы на сентябрь →</a>
          <a href="/docs">Справочник мер поддержки СВО →</a>
          <a href="/docs">XII съезд: Программа ФНПР →</a>
          <a href="/docs">Трёхстороннее соглашение 2026–2028 →</a>
          <a href="/contacts" className="hotline">Горячая линия по трудовому праву →</a>
        </aside>
      </div>

      <section className="section stats-band reveal">
        <h2>ХКООП в цифрах</h2>
        <div className="stats">
          <div><Counter end={77} /><span>лет с 11.12.1948</span></div>
          <div><Counter end={22} prefix="~" /><span>членских организаций*</span></div>
          <div><Counter end={19} prefix="~" /><span>координационных советов*</span></div>
          <div><Counter end={100} prefix="~" suffix=" тыс." /><span>членов профсоюза*</span></div>
        </div>
      </section>

      <section className="section reveal">
        <div className="section-head">
          <h2>Документы</h2>
          <a href="/docs" className="more">Все документы →</a>
        </div>
        <div className="grid">
          {(docs as any[]).slice(0, 4).map((d) => (
            <div key={d.id} className="card doc-card"><div className="card-body">
              <span className="doc-icon">PDF</span>
              <strong>{d.title}</strong>
              <div><small>{typeLabels[d.type] || d.type} · {d.year}</small></div>
              <div className="btn-row"><a className="btn btn-ghost" href={docHref(d)} target={d.file_local ? undefined : "_blank"} rel="noreferrer">Открыть →</a></div>
            </div></div>
          ))}
        </div>
      </section>

      <section className="section reveal">
        <h2>Полезные ссылки</h2>
        <PartnersStrip items={partners as any} />
      </section>

      <section className="section consult-band reveal">
        <div>
          <h2>Бесплатная консультация</h2>
          <p>Горячая линия по вопросам трудового законодательства для членов профсоюза. Ответим в рабочее время: Пн-Чт 9:00–18:00, Пт 9:00–16:20.</p>
          <p><b>8 (4212) 32-87-18</b> · ksps-priem@mail.ru</p>
        </div>
        <div className="card"><div className="card-body"><ConsultForm /></div></div>
      </section>
    </>
  );
}
