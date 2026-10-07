"use client";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import news from "../../data/news.json";
import docs from "../../data/documents.json";

const pages = [
  { title: "О нас", url: "/about", text: "история союз профобъединение 1948 органы конференция" },
  { title: "Деятельность", url: "/activity", text: "правозащита охрана труда соцпартнёрство молодёжь международное" },
  { title: "Книга Почёта", url: "/honor", text: "ветераны награды признание" },
  { title: "Партнёры", url: "/partners", text: "ФНПР правительство фонды вузы" },
  { title: "Контакты", url: "/contacts", text: "адрес телефон email Муравьёва-Амурского горячая линия" },
  { title: "Мероприятия", url: "/events", text: "календарь анонсы форум" },
  { title: "Членские организации", url: "/organizations", text: "реестр первички координационные советы" },
];

function Results() {
  const sp = useSearchParams();
  const [typed, setTyped] = useState("");
  const query = typed || (sp.get("q") || "");

  const res = useMemo(() => {
    const s = query.trim().toLowerCase();
    if (s.length < 2) return null;
    const rn = (news as any[]).filter((n) => (n.title + " " + n.excerpt + " " + (n.tags || []).join(" ")).toLowerCase().includes(s)).map((n) => ({ title: n.title, url: `/news/${n.id}`, tag: "новость" }));
    const rd = (docs as any[]).filter((d) => d.title.toLowerCase().includes(s)).map((d) => ({ title: d.title, url: "/docs", tag: "документ" }));
    const rp = pages.filter((p) => (p.title + " " + p.text).toLowerCase().includes(s)).map((p) => ({ title: p.title, url: p.url, tag: "раздел" }));
    return [...rp, ...rn, ...rd];
  }, [query]);

  return (
    <>
      <div className="toolbar">
        <input className="search" placeholder="Введите запрос… (мин. 2 символа)" defaultValue={sp.get("q") || ""} onChange={(e) => setTyped(e.target.value)} aria-label="Поиск по сайту" autoFocus />
      </div>
      {res && (
        res.length === 0 ? <p>Ничего не найдено.</p> : (
          <div className="grid">
            {res.map((r, k) => (
              <div key={k} className="card"><div className="card-body">
                <small className="cat">{r.tag}</small>
                <h3><a href={r.url}>{r.title}</a></h3>
              </div></div>
            ))}
          </div>
        )
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <>
      <section className="page-hero reveal">
        <p className="aeyebrow">ХКООП · поиск</p>
        <h1 className="atitle">Поиск по сайту</h1>
        <p className="asub">Новости, документы и разделы — в одном месте.</p>
      </section>
      <Suspense><Results /></Suspense>
    </>
  );
}
