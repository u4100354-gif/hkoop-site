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
        <div className="container brand-row">
          <Link href="/" aria-label="ХКООП — на главную"><img src="/images/logo.png" alt="Логотип ХКООП" width={124} height={124} className="round-logo" /></Link>
          <div className="brand-big">Союз «Хабаровское краевое объединение организаций профсоюзов»</div>
        </div>
      </div>
      <nav className="mainnav">
        <div className="container mainnav-inner">
          <Link href="/" className="mob-logo"><img src="/images/logo.png" alt="ХКООП" width={34} height={34} /></Link>
          <div className="mob-search"><HeaderSearch onGo={() => setOpen(false)} /></div>
          <button className="burger" onClick={() => setOpen(true)} aria-label="Открыть меню" aria-expanded={open} aria-controls="mainnav-links"><span aria-hidden="true">☰</span><span className="burger-label">ХКООП</span></button>
          <div className={`links ${open ? "open" : ""}`} id="mainnav-links">
            <div className="drawer-head">
              <strong>Меню</strong>
              <button className="drawer-close" onClick={() => setOpen(false)} aria-label="Закрыть меню">✕</button>
            </div>
            <HeaderSearch onGo={() => setOpen(false)} placeholder="🔍 Поиск по сайту…" chips={["Новости", "Документы", "Мероприятия", "Контакты"]} />
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className={active(n.href) ? "active" : ""} onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            ))}
          </div>
          <div className="bar-search"><HeaderSearch /></div>
          <div className={`drawer-overlay ${open ? "open" : ""}`} onClick={() => setOpen(false)} />
        </div>
      </nav>
    </>
  );
}