"use client";
import { useDeferredValue, useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { queryWords, searchAll, type SearchItem } from "../lib/search";
import SearchHighlight from "./SearchHighlight";

// Общий кэш индекса для всех экземпляров поиска на странице.
let indexPromise: Promise<SearchItem[]> | null = null;
function loadIndex(): Promise<SearchItem[]> {
  if (!indexPromise) {
    indexPromise = fetch("/search-index.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => (Array.isArray(d) ? (d as SearchItem[]) : []))
      .catch(() => []);
  }
  return indexPromise;
}

export default function HeaderSearch({ onGo, placeholder, chips }: { onGo?: () => void; placeholder?: string; chips?: string[] }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<SearchItem[]>([]);
  const [failed, setFailed] = useState(false);
  const [hi, setHi] = useState(-1); // активный пункт для клавиатуры
  const box = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const listId = `hsearch-list-${uid}`;
  const optId = (k: number) => `hsearch-opt-${uid}-${k}`;
  const router = useRouter();

  const dq = useDeferredValue(q);
  const words = useMemo(() => queryWords(dq), [dq]);
  const all = useMemo(() => (index.length > 0 && words.length > 0 ? searchAll(index, dq, 500) : []), [index, dq, words]);
  const shown = all.slice(0, 8);

  useEffect(() => { setHi(-1); }, [dq]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const ensureIndex = () => {
    if (index.length === 0 && !failed) {
      loadIndex().then((d) => {
        if (d.length === 0) setFailed(true);
        else setIndex(d);
      });
    }
  };

  const go = (url: string) => {
    setOpen(false);
    setHi(-1);
    onGo?.();
    router.push(url);
  };

  const submit = () => {
    if (hi >= 0 && hi < shown.length) {
      go(shown[hi].item.url);
      return;
    }
    goSearch();
  };

  const goSearch = () => {
    if (dq.trim().length >= 2) {
      setOpen(false);
      setHi(-1);
      onGo?.();
      router.push(`/search?q=${encodeURIComponent(dq.trim())}`);
    }
  };

  const showDrop = open && (words.length > 0 || failed);

  return (
    <div className="hsearch" ref={box}>
      <div className="hsearch-box">
      <input
        ref={input}
        className="hsearch-input"
        placeholder={placeholder ?? "🔍 Поиск"}
        value={q}
        maxLength={200}
        name="hkoop-q"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        enterKeyHint="search"
        inputMode="search"
        role="combobox"
        aria-expanded={showDrop}
        aria-controls={listId}
        aria-activedescendant={hi >= 0 ? optId(hi) : undefined}
        aria-label="Поиск по сайту"
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => { ensureIndex(); setOpen(true); }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && shown.length > 0) { e.preventDefault(); setHi((v) => (v + 1) % shown.length); }
          else if (e.key === "ArrowUp" && shown.length > 0) { e.preventDefault(); setHi((v) => (v - 1 + shown.length) % shown.length); }
          else if (e.key === "Enter") submit();
          else if (e.key === "Escape") { setOpen(false); setHi(-1); }
        }}
      />
      {q.length > 0 && (
        <button
          type="button"
          className="hsearch-clear"
          aria-label="Очистить поиск"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => { setQ(""); setHi(-1); input.current?.focus(); }}
        >✕</button>
      )}
      </div>
      {chips && chips.length > 0 && (
        <div className="hsearch-hints">
          <span className="hsearch-hints-label">Часто ищут:</span>
          {chips.map((c) => (
            <button key={c} type="button" className="hsearch-chip" onClick={() => { ensureIndex(); setQ(c); setOpen(true); input.current?.focus(); }}>{c}</button>
          ))}
        </div>
      )}
      {showDrop && (
        <div className="hsearch-drop" role="listbox" id={listId} onMouseLeave={() => setHi(-1)}>
          {failed ? (
            <div className="hsearch-empty">Поиск временно недоступен. Откройте страницу <a href="/search">«Поиск по сайту»</a>.</div>
          ) : shown.length === 0 ? (
            <div className="hsearch-empty">Ничего не найдено. Нажмите Enter — покажем страницу поиска.</div>
          ) : (
            <>
              {shown.map((r, k) => (
                <a
                  key={`${r.item.url}-${k}`}
                  id={optId(k)}
                  role="option"
                  aria-selected={hi === k}
                  href={r.item.url}
                  className={hi === k ? "hactive" : ""}
                  onMouseEnter={() => setHi(k)}
                  onClick={(e) => { e.preventDefault(); go(r.item.url); }}
                >
                  <small>{r.item.tag}</small>
                  <span><SearchHighlight text={r.item.title} words={words} /></span>
                </a>
              ))}
              <button className="hsearch-all" onClick={goSearch}>Все результаты{all.length > shown.length ? ` (${all.length})` : ""} →</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
