import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { q, parseTags } from "../../../lib/db";
import Crumbs from "../../../components/Crumbs";
import { safeImgSrc } from "../../../lib/url";

const catLabels: Record<string, string> = {
  molodezh: "Молодёжь",
  "ohrana-truda": "Охрана труда",
  novosti: "Новости",
  mezhdunarodnoe: "Международное",
  podderzhka: "Поддержка",
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const rows: any[] = await q("SELECT title, excerpt FROM news WHERE id=?", [id]);
  if (!rows[0]) return { title: "Новость не найдена — ХКООП" };
  return { title: `${rows[0].title} — ХКООП`, description: String(rows[0].excerpt).slice(0, 160) };
}

export async function generateStaticParams() {
  const rows: any[] = await q("SELECT id FROM news");
  return rows.map((n) => ({ id: n.id }));
}

export default async function NewsDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows: any[] = await q("SELECT id,title,DATE_FORMAT(date,'%Y-%m-%d') AS date,category,tags,excerpt,old_url,image,body FROM news WHERE id=?", [id]);
  const n = rows[0];
  if (!n) notFound();
  // Похожие: сначала та же рубрика, остальное — свежие новости
  let related: any[] = await q(
    "SELECT id,title,DATE_FORMAT(date,'%Y-%m-%d') AS date,category FROM news WHERE id<>? AND category=? ORDER BY date DESC LIMIT 6",
    [id, n.category]
  );
  if (related.length < 6) {
    const extra: any[] = await q(
      "SELECT id,title,DATE_FORMAT(date,'%Y-%m-%d') AS date,category FROM news WHERE id<>? AND category<>? ORDER BY date DESC LIMIT ?",
      [id, n.category, 6 - related.length]
    );
    related = [...related, ...extra].slice(0, 6);
  }
  const tags = parseTags(n.tags);
  const img = safeImgSrc(n.image);
  return (
    <>
      <Crumbs items={[{ href: "/news", label: "Новости" }, { label: n.title }]} />
      <h1 style={{ margin: "10px 0 6px", lineHeight: 1.25 }}>{n.title}</h1>
      <p className="article-meta"><time dateTime={n.date}>{n.date}</time> · {catLabels[n.category] || n.category}{tags.length ? <> · {tags.join(" · ")}</> : null}</p>
      <div className="news-detail-grid">
        <div className="card"><div className="card-body article-page-body">
          {img && <img src={img} alt="" className="article-img" width={1200} height={675} />}
          {n.body ? (
            <div className="article-body" dangerouslySetInnerHTML={{ __html: String(n.body) }} />
          ) : (
            <>
              <p>{n.excerpt}</p>
              <p><small>Полный текст перенести со старого сайта: habprof.ru{n.old_url}</small></p>
            </>
          )}
        </div></div>
        <aside className="news-side" aria-label="Другие новости рубрики">
          <h2 className="side-title">Другие новости</h2>
          <ul className="side-list">
            {related.map((r) => (
              <li key={r.id}>
                <Link href={`/news/${r.id}`}><small>{r.date}</small>{r.title}</Link>
              </li>
            ))}
          </ul>
          <Link href="/news" className="side-all">Все новости →</Link>
        </aside>
      </div>
    </>
  );
}

import Link from "next/link";
