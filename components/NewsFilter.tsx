"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

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
              <img src={n.image || catFallback[n.category] || "/images/i-1.webp"} alt="" loading="lazy" width={400} height={250} />
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
          <span className="es-icon">🔍</span>
          <strong>Ничего не найдено</strong>
          <p>Попробуйте изменить запрос или сбросить фильтр{cat !== "all" ? " категории" : ""}.</p>
          <button type="button" className="btn btn-ghost" onClick={() => { setQ(""); setCat("all"); }}>Сбросить фильтры</button>
        </div>
      )}
    </>
  );
}
