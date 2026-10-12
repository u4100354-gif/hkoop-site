"use client";
import CookieSettings from "./CookieSettings";
import { useEffect, useState } from "react";

const IC = {
  phone: "M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z",
  pin: "M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z",
  mail: "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
  clock: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 10.6l-4.2 2.5-.8-1.3L11.5 11V7h1.5v5.6z",
  send: "M2 21l21-9L2 3v7l15 2-15 2v7z",
  eye: "M12 5c5 0 9.3 3 11 7-1.7 4-6 7-11 7S2.7 16 1 12c1.7-4 6-7 11-7zm0 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-6.5A2.5 2.5 0 1 1 12 14a2.5 2.5 0 0 1 0-4.5z",
};

function Icon({ d }: { d: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default function Footer() {
  const [vi, setVi] = useState(() => (typeof window === "undefined" ? false : localStorage.getItem("hkoop-vi") === "1"));

  useEffect(() => {
    const handleViChange = () => {
      setVi(localStorage.getItem("hkoop-vi") === "1");
    };
    window.addEventListener("hkoop-vi", handleViChange);
    return () => window.removeEventListener("hkoop-vi", handleViChange);
  }, []);

  const toggleVi = () => {
    if (typeof (window as any).toggleVi === "function") {
      (window as any).toggleVi();
    } else {
      const nv = !vi;
      localStorage.setItem("hkoop-vi", nv ? "1" : "0");
      setVi(nv);
      document.body.classList.toggle("vi-mode", nv);
      window.dispatchEvent(new Event("hkoop-vi"));
    }
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <strong className="footer-title">Контакты</strong>
          <div className="frow"><Icon d={IC.mail} /><a href="mailto:ksps-priem@mail.ru">ksps-priem@mail.ru</a></div>
          <div className="frow"><Icon d={IC.phone} /><a href="tel:+74212328718">8 (4212) 32-87-18</a><span> · факс: 32-47-02</span></div>
          <div className="frow"><Icon d={IC.clock} /><span>Пн-Чт: 9:00–18:00 · Пт: 9:00–16:20</span></div>
          <div className="frow"><Icon d={IC.pin} /><span>680000, г. Хабаровск, ул. Муравьева-Амурского, 4</span></div>
        </div>
        <div className="footer-col">
          <strong className="footer-title">Разделы</strong>
          <div className="footer-links"><a href="/news">Новости</a> · <a href="/events">Мероприятия</a></div>
          <div className="footer-links"><a href="/organizations">Членские организации</a></div>
          <div className="footer-links"><a href="/honor">Книга Почёта</a> · <a href="/partners">Партнёры</a></div>
          <div className="footer-links"><a href="/about">О нас</a> · <a href="/activity">Деятельность</a></div>
        </div>
        <div className="footer-col">
          <strong className="footer-title">Мы в соцсетях</strong>
          <div className="frow"><Icon d={IC.send} /><a href="https://vk.com/habprof_27">VK</a></div>
          <div className="frow"><Icon d={IC.send} /><a href="https://t.me/habprof">Telegram</a></div>
          <div className="frow"><Icon d={IC.send} /><a href="https://max.ru/id2702080071_biz">MAX</a></div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span className="footer-copy">Союз «Хабаровское краевое объединение организаций профсоюзов» · Локальный прототип · <CookieSettings /></span>
        <button onClick={toggleVi} className="vi-btn-footer">
          <Icon d={IC.eye} />{vi ? "Обычная версия" : "Версия для слабовидящих"}
        </button>
      </div>
    </footer>
  );
}
