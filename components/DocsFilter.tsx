"use client";
import { useMemo, useState } from "react";
import { safeHref } from "../lib/url";

// Превью — только локальные PDF из /docs: чужой origin в iframe не пускаем.
function safePreview(h: unknown): string | null {
  if (typeof h !== "string") return null;
  const v = h.trim();
  if (!v.startsWith("/docs/") || !v.toLowerCase().endsWith(".pdf")) return null;
  if (v.includes("..") || v.includes("\\")) return null;
  return v;
}

type D = { id: string; title: string; type: string; year: number; file_old?: string; file_local?: string; old_url?: string };

const typeLabels: Record<string, string> = {
  plan: "Планы",
  soglashenie: "Соглашения",
  program: "Программы",
  policy: "Политика",
  document: "Документы",
};

export default function DocsFilter({ items }: { items: D[] }) {
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const types = useMemo(() => ["all", ...Array.from(new Set(items.map((i) => i.type)))], [items]);
  const [preview, setPreview] = useState<string | null>(null);
  const [limit, setLimit] = useState(24);

  const filtered = items.filter((d) => {
    const ok = type === "all" || d.type === type;
    return ok && d.title.toLowerCase().includes(q.toLowerCase());
  });
  const shown = filtered.slice(0, limit);

  return (
    <>
      <div className="toolbar">
        <input className="search" name="q" maxLength={200} placeholder="Поиск по документам…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Поиск" />
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Тип">
          {types.map((t) => (
            <option key={t} value={t}>{t === "all" ? "Все типы" : (typeLabels[t] || t)}</option>
          ))}
        </select>
        {(q || type !== "all") && (
          <button type="button" className="reset" onClick={() => { setQ(""); setType("all"); }}>Сбросить</button>
        )}
      </div>
      <p className="result-count" aria-live="polite">
        {filtered.length === 0 ? "Совпадений нет" : `Показано ${shown.length} из ${filtered.length}`}
      </p>
      <div className="grid">
        {shown.map((d) => (
          <div key={d.id} className="card doc-card">
            <div className="card-body">
              <span className="doc-icon">PDF</span>
              <strong>{d.title}</strong>
              <div><small>{typeLabels[d.type] || d.type} · {d.year}</small></div>
              <div className="btn-row">
                {safePreview(d.file_local) && <button className="btn btn-ghost" onClick={() => setPreview(safePreview(d.file_local)!)}>Смотреть</button>}
                {safeHref(d.file_old) && <a className="btn btn-ghost" href={safeHref(d.file_old)!} target="_blank" rel="noreferrer">PDF</a>}
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="empty-state">
          <span className="es-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="#3aa655"><path d="M9 11H5V5h6V3H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5h-2v2zM15 5h2v5h2V3a1 1 0 0 0-1-1h-5v2z"/></svg></span>
          <strong>Документы не найдены</strong>
          <p>Измените запрос или сбросьте фильтр типа.</p>
          <button type="button" className="btn btn-ghost" onClick={() => { setQ(""); setType("all"); }}>Сбросить фильтры</button>
        </div>
      )}
      {limit < filtered.length && (
        <div className="load-more">
          <button type="button" className="btn btn-primary" onClick={() => setLimit((l) => l + 24)}>
            Показать ещё ({filtered.length - limit})
          </button>
        </div>
      )}
      {preview && (
        <div className="preview-box">
          <div className="preview-head">
            <strong>Просмотр PDF</strong>
            <button onClick={() => setPreview(null)}>Закрыть ✕</button>
          </div>
          <iframe src={preview} width="100%" height="600" title="PDF" sandbox="" referrerPolicy="no-referrer" />
        </div>
      )}
    </>
  );
}