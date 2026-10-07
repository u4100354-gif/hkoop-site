"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function revealVisible() {
  document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.95 && r.bottom > 0) el.classList.add("in");
  });
}

export default function ScrollFx() {
  const [top, setTop] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal:not(.in)"));
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    // Страховка: показать всё видимое сразу и остальное через 2.5с
    const t1 = requestAnimationFrame(revealVisible);
    const t2 = setTimeout(() => {
      revealVisible();
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => el.classList.add("in"));
    }, 2500);
    return () => {
      io.disconnect();
      cancelAnimationFrame(t1);
      clearTimeout(t2);
    };
  }, [path]);

  useEffect(() => {
    const onScroll = () => setTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!top) return null;
  return (
    <button className="totop" aria-label="Наверх" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      ↑
    </button>
  );
}
