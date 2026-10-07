"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const slides = [
  {
    bg: "/images/ccfaee06-8db0-44ca-8005-1033f511a98e.jpg",
    title: "План работы Хабаровского Профобъединения",
    sub: "на 2026 год",
    link: "/docs",
  },
  {
    bg: "/images/i-1.webp",
    title: "Год трудового единства и солидарности",
    sub: "План основных мероприятий ХКООП",
    link: "/docs",
  },
  {
    bg: "/images/96ef99bb-f1ef-47a1-a6ee-9d558c479bbd.jpg",
    title: "Хабаровское Профобъединение",
    sub: "77 лет на страже прав трудящихся",
    link: "/about",
  },
];

const DURATION = 6500;

export default function Slider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((k: number) => {
    setI(((k % slides.length) + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), DURATION);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      className="slider-apple"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (dx > 40) go(i - 1);
        if (dx < -40) go(i + 1);
        touchX.current = null;
      }}
      aria-roledescription="carousel"
    >
      {slides.map((s, k) => (
        <div key={k} className={`aslide ${k === i ? "active" : ""}`} aria-hidden={k !== i}>
          <div className="aslide-bg" style={{ backgroundImage: `url(${s.bg})` }} />
          <div className="aslide-veil" />
        </div>
      ))}

      <button className="slider-arrow left" onClick={() => go(i - 1)} aria-label="Назад">←</button>

      <div className="container acontent" key={i}>
        <p className="aeyebrow">ХКООП · Хабаровск</p>
        <h1 className="atitle">{slides[i].title}</h1>
        <p className="asub">{slides[i].sub}</p>
        <div className="abtns">
          <a className="btn btn-slider" href={slides[i].link}>Подробнее</a>
          <a className="alink" href="/news">Все новости →</a>
        </div>
        <div className="abars">
          {slides.map((_, k) => (
            <button
              key={k}
              className={`abar ${k === i ? "active" : ""} ${k < i ? "seen" : ""}`}
              onClick={() => go(k)}
              aria-label={`Слайд ${k + 1}`}
            >
              {k === i && !paused && <span className="afill" />}
            </button>
          ))}
        </div>
      </div>

      <button className="slider-arrow right" onClick={() => go(i + 1)} aria-label="Вперёд">→</button>
    </section>
  );
}
