"use client";
import { useMemo, useState } from "react";

type D = { id: string; title: string; type: string; year: number; file_old?: string; file_local?: string; old_url?: string };

const typeLabels: Record<string, string> = {
  plan: "Планы",
  soglashenie: "Соглашения",
  program: "Программы",
  policy: "Политика",
};

export default function DocsFilter({ items }: { items: D[] }) {
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const types = useMemo(() => ["all", ...Array.from(new Set(items.map((i) => i.type)))], [items]);
  const [preview, setPreview] = useState<string | null>(null);

  const filtered = items.filter((d) => {
    const ok = type === "all" || d.type === type;
    return ok && d.title.toLowerCase().includes(q.toLowerCase());
  });

  return (
    <>
      <div className="toolbar">
        <input className="search" placeholder="Поиск по документам…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Поиск" />
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Тип">
          {types.map((t) => (
            <option key={t} value={t}>{t === "all" ? "Все типы" : (typeLabels[t] || t)}</option>
          ))}
        </select>
      </div>
      <div className="grid">
        {filtered.map((d) => (
          <div key={d.id} className="card doc-card">
            <div className="card-body">
              <strong>{d.title}</strong>
              <div><small>{typeLabels[d.type] || d.type} · {d.year}</small></div>
              <div className="btn-row">
                {d.file_local && <button className="btn btn-ghost" onClick={() => setPreview(d.file_local!)}>Смотреть</button>}
                {d.file_old && <a className="btn btn-ghost" href={d.file_old} target="_blank" rel="noreferrer">PDF</a>}
              </div>
            </div>
          </div>
        ))}
      </div>
      {preview && (
        <div className="preview-box">
          <div className="preview-head">
            <strong>Просмотр PDF</strong>
            <button onClick={() => setPreview(null)}>Закрыть ✕</button>
          </div>
          <iframe src={preview} width="100%" height="600" title="PDF" />
        </div>
      )}
    </>
  );
}
