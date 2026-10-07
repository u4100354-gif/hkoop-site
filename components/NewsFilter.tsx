"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

type N = { id: string; title: string; date: string; category: string; tags: string[]; excerpt: string };

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
  const cats = useMemo(() => ["all", ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const filtered = items.filter((n) => {
    const okCat = cat === "all" || n.category === cat;
    const s = (n.title + " " + n.excerpt + " " + n.tags.join(" ")).toLowerCase();
    return okCat && s.includes(q.toLowerCase());
  });
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
      </div>
      <div className="grid">
        {filtered.map((n) => (
          <article key={n.id} className="card doc-card">
            <div className="card-body">
              <small>{n.date} · {catLabels[n.category] || n.category}</small>
              <h3><Link href={`/news/${n.id}`}>{n.title}</Link></h3>
              <p>{n.excerpt}</p>
              <div><small>{n.tags.join(" · ")}</small></div>
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && <p>Ничего не найдено.</p>}
    </>
  );
}
