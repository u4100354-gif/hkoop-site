"use client";
import { useEffect, useMemo, useState } from "react";
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
  // Safari (macOS/iOS) не рендерит PDF внутри iframe → показываем заглушку с открытием во вкладке
  const isSafari = typeof window === "object"
    ? /^((?!chrome|chromium|crios|fxios|edg|android|opr).)*safari/i.test(navigator.userAgent) || /iPad|iPhone|iPod/.test(navigator.userAgent)
    : false;
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const types = useMemo(() => ["all", ...Array.from(new Set(items.map((i) => i.type)))], [items]);
  const [preview, setPreview] = useState<{ src: string; title: string } | null>(null);
  const [limit, setLimit] = useState(24);

  // Модалка: ESC и блокировка прокрутки фона
  useEffect(() => {
    if (!preview) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setPreview(null); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [preview]);

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
              <div className="doc-foot">
                <small>{typeLabels[d.type] || d.type} · {d.year}</small>
                <div className="btn-row">
                  {safePreview(d.file_local) && <button className="btn btn-ghost" onClick={() => setPreview({ src: safePreview(d.file_local)!, title: d.title })}>Смотреть</button>}
                  {safeHref(d.file_old) && <a className="btn btn-ghost" href={safeHref(d.file_old)!} target="_blank" rel="noreferrer">PDF</a>}
                  {!safePreview(d.file_local) && !safeHref(d.file_old) && <span className="doc-missing">файл уточняется</span>}
                </div>
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
        <div className="pdf-modal" role="dialog" aria-modal="true" aria-label={`Просмотр: ${preview.title}`} onClick={(e) => { if (e.target === e.currentTarget) setPreview(null); }}>
          <div className="pdf-panel">
            <div className="pdf-modal-head">
              <strong className="pdf-modal-title">{preview.title}</strong>
              <div className="pdf-modal-actions">
                <a className="btn btn-ghost btn-sm" href={preview.src} target="_blank" rel="noreferrer">Открыть в новой вкладке</a>
                <button className="pdf-close" onClick={() => setPreview(null)} aria-label="Закрыть просмотр">✕</button>
              </div>
            </div>
            {isSafari ? (
              // Safari не рендерит PDF внутри iframe — честная заглушка вместо белого экрана
              <div className="pdf-fallback">
                <span className="pdf-fb-icon"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg></span>
                <strong>Встроенный просмотр недоступен в Safari</strong>
                <p>Браузер Apple не умеет показывать PDF в окне — документ откроется в отдельной вкладке.</p>
                <a className="btn btn-primary" href={preview.src} target="_blank" rel="noreferrer">Открыть PDF</a>
              </div>
            ) : (
              <>
                <iframe className="pdf-frame" src={preview.src} title={`PDF: ${preview.title}`} referrerPolicy="no-referrer" />
                <p className="pdf-note">
                  Если PDF не виден — <a href={preview.src} target="_blank" rel="noreferrer">откройте файл в новой вкладке</a>.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}