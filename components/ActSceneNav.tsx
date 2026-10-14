"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Scene = { id: string; label: string };

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
        // ближайшая к верхнему краю видимая сцена — активная
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
    return () => io.disconnect();
  }, [scenes]);

  return (
    <nav className={`act-nav ${onLight ? "on-light" : ""}`} aria-label="Сцены страницы">
      {scenes.map((s) => (
        <Link key={s.id} href={`#${s.id}`} className={active === s.id ? "on" : ""}>
          <span className="dot" aria-hidden="true" />
          <span className="lbl">{s.label}</span>
        </Link>
      ))}
    </nav>
  );
}
