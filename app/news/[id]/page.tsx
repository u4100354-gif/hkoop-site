import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { q, parseTags } from "../../../lib/db";
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
  const rows: any[] = await q("SELECT id,title,DATE_FORMAT(date,'%Y-%m-%d') AS date,category,tags,excerpt,old_url,image FROM news WHERE id=?", [id]);
  const n = rows[0];
  if (!n) notFound();
  const tags = parseTags(n.tags);
  const img = safeImgSrc(n.image);
  return (
    <>
      <p style={{ margin: "22px 0 0" }}><a href="/news">← Все новости</a></p>
      <h1 style={{ margin: "10px 0 6px", lineHeight: 1.25 }}>{n.title}</h1>
      <p><small>{n.date} · {catLabels[n.category] || n.category} · {tags.join(" · ")}</small></p>
      <div className="card"><div className="card-body">
        {img && <img src={img} alt="" className="article-img" width={1200} height={675} />}
        <p>{n.excerpt}</p>
        <p><small>Полный текст перенести со старого сайта: habprof.ru{n.old_url}</small></p>
      </div></div>
    </>
  );
}
