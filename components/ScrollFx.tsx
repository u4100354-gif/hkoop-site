"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
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
