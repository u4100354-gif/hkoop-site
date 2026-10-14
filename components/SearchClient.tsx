"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { queryWords, searchAll, type SearchItem } from "../lib/search";
import SearchHighlight from "./SearchHighlight";

function Results() {
  const sp = useSearchParams();
  const [index, setIndex] = useState<SearchItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [typed, setTyped] = useState("");
  const [limit, setLimit] = useState(24);
  const query = typed || sp.get("q") || "";
  const words = useMemo(() => queryWords(query), [query]);

  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => { setIndex(Array.isArray(d) ? d : []); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, []);

  const res = useMemo(() => {
    if (words.length === 0) return null;
    return searchAll(index, query, 60);
  }, [query, index, words]);
  const shown = res ? res.slice(0, limit) : res;
  const limitClick = res && res.length > limit ? (
    <div className="load-more">
      <button type="button" className="btn btn-primary" onClick={() => setLimit((l) => l + 24)}>
        Показать ещё ({res.length - limit})
      </button>
    </div>
  ) : null;

  return (
    <>
      <div className="toolbar">
        <input className="search" placeholder="Введите запрос… (мин. 2 символа)" defaultValue={sp.get("q") || ""} onChange={(e) => setTyped(e.target.value)} aria-label="Поиск по сайту" />
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
              {(shown ?? []).map((r, k) => (
                <div key={k} className="card"><div className="card-body">
                  <small className="cat">{r.item.tag}</small>
                  <h3><a href={r.item.url}><SearchHighlight text={r.item.title} words={words} /></a></h3>
                </div></div>
              ))}
            </div>
            {res.length > limit && limitClick}
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
