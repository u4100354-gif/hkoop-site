"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import news from "../data/news.json";
import docs from "../data/documents.json";

const pages = [
  { title: "О нас", url: "/about", text: "история союз 1948 органы конференция" },
  { title: "Деятельность", url: "/activity", text: "правозащита охрана труда соцпартнёрство молодёжь" },
  { title: "Книга Почёта", url: "/honor", text: "ветераны награды" },
  { title: "Партнёры", url: "/partners", text: "фнпр правительство фонды" },
  { title: "Контакты", url: "/contacts", text: "адрес телефон email горячая линия" },
  { title: "Мероприятия", url: "/events", text: "календарь анонсы" },
  { title: "Членские организации", url: "/organizations", text: "реестр первички советы" },
];

export default function HeaderSearch({ onGo }: { onGo?: () => void }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const res = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 2) return [];
    const rn = (news as any[]).filter((n) => (n.title + " " + n.excerpt).toLowerCase().includes(s)).map((n) => ({ title: n.title, url: `/news/${n.id}`, tag: "новость" }));
    const rd = (docs as any[]).filter((d) => d.title.toLowerCase().includes(s)).map((d) => ({ title: d.title, url: "/docs", tag: "документ" }));
    const rp = pages.filter((p) => (p.title + " " + p.text).toLowerCase().includes(s)).map((p) => ({ title: p.title, url: p.url, tag: "раздел" }));
    return [...rp, ...rn, ...rd].slice(0, 8);
  }, [q]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const submit = () => {
    if (q.trim().length >= 2) {
      setOpen(false);
      onGo?.();
      router.push(`/search?q=${encodeURIComponent(q.trim())}`);
    }
  };

  return (
    <div className="hsearch" ref={box}>
      <input
        className="hsearch-input"
        placeholder="🔍 Поиск"
        value={q}
        aria-label="Поиск по сайту"
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
          if (e.key === "Escape") setOpen(false);
        }}
      />
      {open && res.length > 0 && (
        <div className="hsearch-drop">
          {res.map((r, k) => (
            <a key={k} href={r.url} onClick={() => { setOpen(false); onGo?.(); }}>
              <small>{r.tag}</small>
              <span>{r.title}</span>
            </a>
          ))}
          <button className="hsearch-all" onClick={submit}>Все результаты →</button>
        </div>
      )}
    </div>
  );
}
