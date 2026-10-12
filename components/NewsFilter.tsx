"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { safeImgSrc } from "../lib/url";

type N = { id: string; title: string; date: string; category: string; tags: string[]; excerpt: string; image?: string | null };

const catFallback: Record<string, string> = {
  molodezh: "/images/i-1.webp",
  "ohrana-truda": "/images/96ef99bb-f1ef-47a1-a6ee-9d558c479bbd.jpg",
  novosti: "/images/год3.png",
  mezhdunarodnoe: "/images/ccfaee06-8db0-44ca-8005-1033f511a98e.jpg",
  podderzhka: "/images/Asset-13.png",
};

const catLabels: Record<string, string> = {
  molodezh: "Молодёжь",
  "ohrana-truda": "Охрана труда",
  novosti: "Новости",
  mezhdunarodnoe: "Международное",
  podderzhka: "Поддержка",
};

export default function NewsFilter({ items }: { items: N[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [limit, setLimit] = useState(24);
  const cats = useMemo(() => ["all", ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const filtered = items.filter((n) => {
    const okCat = cat === "all" || n.category === cat;
    const s = (n.title + " " + n.excerpt + " " + n.tags.join(" ")).toLowerCase();
    return okCat && s.includes(q.toLowerCase());
  });
  const shown = filtered.slice(0, limit);
  return (
    <>
      <div className="toolbar">
        <input
          className="search"
          name="q"
          maxLength={200}
          placeholder="Поиск по новостям…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Поиск"
        />
        <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Категория">
          {cats.map((c) => (
            <option key={c} value={c}>{c === "all" ? "Все категории" : (catLabels[c] || c)}</option>
          ))}
        </select>
        {(q || cat !== "all") && (
          <button type="button" className="reset" onClick={() => { setQ(""); setCat("all"); }}>Сбросить</button>
        )}
      </div>
      <p className="result-count" aria-live="polite">
        {filtered.length === 0 ? "Совпадений нет" : `Показано ${shown.length} из ${filtered.length}`}
      </p>
      <div className="grid">
        {shown.map((n) => (
          <article key={n.id} className="card news-card">
            <div className="thumb">
              <img src={safeImgSrc(n.image) || catFallback[n.category] || "/images/i-1.webp"} alt={n.title} loading="lazy" width={400} height={250} />
              <span className="date-badge">{n.date}</span>
            </div>
            <div className="card-body">
              <small className="cat">{catLabels[n.category] || n.category}</small>
              <h3><Link href={`/news/${n.id}`}>{n.title}</Link></h3>
              <p>{n.excerpt}</p>
              <div><small>{n.tags.join(" · ")}</small></div>
            </div>
          </article>
        ))}
      </div>
      {limit < filtered.length && (
        <div className="load-more">
          <button type="button" className="btn btn-primary" onClick={() => setLimit((l) => l + 24)}>
            Показать ещё ({filtered.length - limit})
          </button>
        </div>
      )}
      {filtered.length === 0 && (
        <div className="empty-state">
          <span className="es-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="#3aa655"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></span>
          <strong>Ничего не найдено</strong>
          <p>Попробуйте изменить запрос или сбросить фильтр{cat !== "all" ? " категории" : ""}.</p>
          <button type="button" className="btn btn-ghost" onClick={() => { setQ(""); setCat("all"); }}>Сбросить фильтры</button>
        </div>
      )}
    </>
  );
}