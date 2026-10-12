"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HeaderSearch from "./HeaderSearch";

const nav = [
  { href: "/", label: "Главная" },
  { href: "/news", label: "Новости" },
  { href: "/about", label: "О нас" },
  { href: "/activity", label: "Деятельность" },
  { href: "/docs", label: "Документы" },
  { href: "/honor", label: "Книга Почета" },
  { href: "/partners", label: "Партнеры" },
  { href: "/contacts", label: "Контакты" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [path]);

  const active = (href: string) =>
    href === "/" ? path === "/" : path === href || path.startsWith(href + "/");

  return (
    <>
      <div className="topbar-dark">
        <div className="container topbar-dark-inner">
          <div className="topbar-contacts">
            <span className="tcontact"><svg width="15" height="15" viewBox="0 0 24 24" fill="#3aa655"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>8 (4212) 32-87-18</span>
            <span className="tcontact"><svg width="15" height="15" viewBox="0 0 24 24" fill="#3aa655"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>680000, г. Хабаровск, ул. Муравьева-Амурского, 4</span>
            <span className="tcontact"><svg width="15" height="15" viewBox="0 0 24 24" fill="#3aa655"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2-2h16a2 2 0 0 0 2-2V6a2 2 0 0 0 2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>ksps-priem@mail.ru</span>
          </div>
        </div>
        <div className="container brand-row">
          <img src="/images/logo.png" alt="ХКООП" width={110} height={110} className="round-logo" />
          <div className="brand-big">Союз «Хабаровское краевое объединение организаций профсоюзов»</div>
        </div>
      </div>
      <nav className="mainnav">
        <div className="container mainnav-inner">
          <Link href="/" className="mob-logo"><img src="/images/logo.png" alt="ХКООП" width={34} height={34} /></Link>
          <button className="burger" onClick={() => setOpen(true)} aria-label="Открыть меню" aria-expanded={open} aria-controls="mainnav-links">☰</button>
          <div className={`links ${open ? "open" : ""}`} id="mainnav-links">
            <div className="drawer-head">
              <strong>Меню</strong>
              <button className="drawer-close" onClick={() => setOpen(false)} aria-label="Закрыть меню">✕</button>
            </div>
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className={active(n.href) ? "active" : ""} onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            ))}
            <HeaderSearch onGo={() => setOpen(false)} />
          </div>
          <div className={`drawer-overlay ${open ? "open" : ""}`} onClick={() => setOpen(false)} />
        </div>
      </nav>
    </>
  );
}