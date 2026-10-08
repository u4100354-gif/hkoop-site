"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Item = { title: string; url: string; tag: string; text: string };

function Results() {
  const sp = useSearchParams();
  const [index, setIndex] = useState<Item[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [typed, setTyped] = useState("");
  const query = typed || sp.get("q") || "";

  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => { setIndex(Array.isArray(d) ? d : []); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, []);

  const res = useMemo(() => {
    const s = query.trim().toLowerCase();
    if (s.length < 2) return null;
    return index.filter((i) => i.text.includes(s)).slice(0, 60);
  }, [query, index]);

  return (
    <>
      <div className="toolbar">
        <input className="search" placeholder="Введите запрос… (мин. 2 символа)" defaultValue={sp.get("q") || ""} onChange={(e) => setTyped(e.target.value)} aria-label="Поиск по сайту" autoFocus />
      </div>
      {!loaded && <p className="result-count">Загружаем базу поиска…</p>}
      {res && loaded && (
        res.length === 0 ? (
          <div className="empty-state">
            <span className="es-icon">🔍</span>
            <strong>Ничего не найдено</strong>
            <p>Попробуйте другой запрос — например «охрана труда», «план», «конференция».</p>
          </div>
        ) : (
          <>
            <p className="result-count" aria-live="polite">Найдено: {res.length}</p>
            <div className="grid">
              {res.map((r, k) => (
                <div key={k} className="card"><div className="card-body">
                  <small className="cat">{r.tag}</small>
                  <h3><a href={r.url}>{r.title}</a></h3>
                </div></div>
              ))}
            </div>
          </>
        )
      )}
      {query.trim().length > 0 && query.trim().length < 2 && <p className="result-count">Введите минимум 2 символа.</p>}
    </>
  );
}

export default function SearchClient() {
  return (
    <>
      <section className="page-hero reveal">
        <p className="aeyebrow">ХКООП · поиск</p>
        <h1 className="atitle">Поиск по сайту</h1>
        <p className="asub">Новости, документы и разделы — в одном месте.</p>
      </section>
      <Suspense fallback={<p className="result-count">Загрузка…</p>}><Results /></Suspense>
    </>
  );
}
