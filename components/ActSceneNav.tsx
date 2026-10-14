"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Scene = { id: string; label: string; accent: string };

export default function ActSceneNav({ scenes }: { scenes: Scene[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    const sections = scenes
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (vis) {
          setActive(vis.target.id);
          setOnLight(vis.target.classList.contains("act-light"));
        }
      },
      { threshold: 0.35 }
    );
    sections.forEach((el) => io.observe(el));

    // Параллакс: фон-слои сцен ползут чуть медленнее прокрутки
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      for (const el of sections) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        el.style.setProperty("--py", p.toFixed(3));
      }
    };
    const onScroll = () => {
      if (ticking || reduced) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [scenes]);

  return (
    <nav className={`act-nav ${onLight ? "on-light" : ""}`} aria-label="Разделы страницы">
      {scenes.map((s) => (
        <Link
          key={s.id}
          href={`#${s.id}`}
          className={active === s.id ? "on" : ""}
          aria-current={active === s.id ? "true" : undefined}
          aria-label={s.label}
          style={{ "--nva": s.accent } as React.CSSProperties}
        >
          <span className="dot" aria-hidden="true" />
          <span className="lbl">{s.label}</span>
        </Link>
      ))}
    </nav>
  );
}
