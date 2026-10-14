import Link from "next/link";
import Slider from "../components/Slider";
import ConsultForm from "../components/ConsultForm";
import PartnersStrip from "../components/PartnersStrip";
import Counter from "../components/Counter";
import ActSceneNav from "../components/ActSceneNav";
import { q } from "../lib/db";
import { safeHref, safeImgSrc } from "../lib/url";

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

const catFallback: Record<string, string> = {
  molodezh: "/images/i-1.webp",
  "ohrana-truda": "/images/96ef99bb-f1ef-47a1-a6ee-9d558c479bbd.jpg",
  novosti: "/images/год3.png",
  mezhdunarodnoe: "/images/ccfaee06-8db0-44ca-8005-1033f511a98e.jpg",
  podderzhka: "/images/Asset-13.png",
};

const newsImages: Record<string, string> = {
  "forum-profmlodezh-2026": "/images/i-1.webp",
  "fnpr-grubaya-neostorozhnost": "/images/96ef99bb-f1ef-47a1-a6ee-9d558c479bbd.jpg",
  "den-flaga-2026": "/images/год3.png",
  "harbin-vstrecha-2026": "/images/ccfaee06-8db0-44ca-8005-1033f511a98e.jpg",
  "plany-sentyabr": "/images/banners/banner-1.JPG",
  "svo-spravochnik": "/images/Asset-13.png",
};

export default async function Home() {
  const [news, docs, partners]: any[][] = await Promise.all([
    q("SELECT id,title,DATE_FORMAT(date,'%Y-%m-%d') AS date,category,excerpt,image FROM news ORDER BY date DESC LIMIT 4"),
    q("SELECT id,title,type,year,file_local,file_old,old_url FROM documents ORDER BY year DESC LIMIT 4"),
    q("SELECT * FROM partners ORDER BY name"),
  ]);
  const docHref = (d: any) => safeHref(d.file_local) || safeHref(d.file_old) || "/docs";
  return (
    <div className="act-page">
      <Slider />
      <ActSceneNav scenes={[
        { id: "news", label: "Новости", accent: "#8a6a12" },
        { id: "cifry", label: "В цифрах", accent: "#f0c264" },
        { id: "docs", label: "Документы", accent: "#9ae6b4" },
        { id: "links", label: "Партнёры", accent: "#8a6a12" },
        { id: "konsult", label: "Консультация", accent: "#f0c264" },
      ]} />

      <section id="news" className="act-scene act-light v-org">
        <div className="container act-inner-wide">
          <p className="act-eyebrow act-r reveal" style={{ "--i": 0 } as React.CSSProperties}>Информируем</p>
          <h2 className="act-title act-r reveal" style={{ "--i": 1 } as React.CSSProperties}>Новости</h2>
          <div className="act-r reveal" style={{ "--i": 2 } as React.CSSProperties}>
            <div className="grid">
              {(news as any[]).slice(0, 4).map((n) => (
                <article key={n.id} className="card news-card">
                  <div className="thumb">
                    <img src={safeImgSrc(n.image) || newsImages[n.id] || catFallback[n.category] || "/images/i-1.webp"} alt={n.title} loading="lazy" width={400} height={250} />
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
          </div>
          <div className="act-ctas act-r reveal" style={{ "--i": 3 } as React.CSSProperties}>
            <Link href="/news" className="act-link">
              Все новости
              <span className="act-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="cifry" className="act-scene act-dark v-socpart">
        <div className="container act-inner">
          <p className="act-eyebrow act-r reveal" style={{ "--i": 0 } as React.CSSProperties}>ХКООП в цифрах</p>
          <h2 className="act-title act-r reveal" style={{ "--i": 1 } as React.CSSProperties}>Сила — в единстве</h2>
          <div className="act-nums act-r reveal" style={{ "--i": 2 } as React.CSSProperties}>
            <div className="act-num-item"><b><Counter end={77} /></b><span>лет с 11.12.1948</span></div>
            <div className="act-num-item"><b><Counter end={20} /></b><span>членских организаций</span></div>
            <div className="act-num-item"><b><Counter end={7} /></b><span>координационных советов</span></div>
            <div className="act-num-item"><b><Counter end={102} suffix=" тыс." /></b><span>членов профсоюза</span></div>
          </div>
        </div>
      </section>

      <section id="docs" className="act-scene act-dark v-molodezh">
        <div className="container act-inner">
          <p className="act-eyebrow act-r reveal" style={{ "--i": 0 } as React.CSSProperties}>База документов</p>
          <h2 className="act-title act-r reveal" style={{ "--i": 1 } as React.CSSProperties}>Планы и соглашения</h2>
          <div className="act-docgrid act-r reveal" style={{ "--i": 2 } as React.CSSProperties}>
            {(docs as any[]).slice(0, 4).map((d) => (
              <div key={d.id} className="card doc-card">
                <div className="card-body">
                  <span className="doc-icon">PDF</span>
                  <strong>{d.title}</strong>
                  <div><small>{typeLabels[d.type] || d.type} · {d.year}</small></div>
                  <div className="btn-row"><a className="btn btn-ghost" href={docHref(d)} target={d.file_local ? undefined : "_blank"} rel="noreferrer">Открыть →</a></div>
                </div>
              </div>
            ))}
          </div>
          <div className="act-ctas act-r reveal" style={{ "--i": 3 } as React.CSSProperties}>
            <Link href="/docs" className="act-btn-white">
              Все документы
              <span className="act-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="links" className="act-scene act-light v-org">
        <div className="container act-inner-wide">
          <p className="act-eyebrow act-r reveal" style={{ "--i": 0 } as React.CSSProperties}>Полезные ссылки</p>
          <h2 className="act-title act-r reveal" style={{ "--i": 1 } as React.CSSProperties}>Наши партнёры</h2>
          <div className="act-r reveal" style={{ "--i": 2 } as React.CSSProperties}>
            <PartnersStrip items={(partners as any).slice(0, 6)} />
          </div>
          <div className="act-ctas act-r reveal" style={{ "--i": 3 } as React.CSSProperties}>
            <Link href="/partners" className="act-link">
              Подробнее о партнёрстве
              <span className="act-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="konsult" className="act-scene act-dark v-socpart">
        <div className="container act-split">
          <div className="act-split-info reveal in">
            <p className="act-eyebrow">Бесплатно для членов профсоюза</p>
            <h2 className="act-title">Консультация юриста</h2>
            <div className="act-text">
              <p>Горячая линия по вопросам трудового законодательства для членов профсоюза. Ответим в рабочее время.</p>
              <p><b>8 (4212) 32-87-18</b> · ksps-priem@mail.ru</p>
              <p>Пн-Чт 9:00–18:00, Пт 9:00–16:20</p>
            </div>
            <div className="act-ctas">
              <a href="tel:+784212328718" className="act-btn-white">Позвонить на линию<span className="act-arrow" aria-hidden="true">→</span></a>
            </div>
          </div>
          <div className="act-form-card reveal in">
            <ConsultForm />
          </div>
        </div>
      </section>
    </div>
  );
}
