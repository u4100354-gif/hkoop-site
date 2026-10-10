"use client";
import { useEffect, useRef, useState } from "react";

const DURATION = 2200;

export default function Counter({ end, prefix = "", suffix = "" }: { end: number; prefix?: string; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const start = () => {
      if (done.current) return;
      done.current = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setV(end);
        return;
      }
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / DURATION);
        // easeOutExpo: быстрый старт, долгое медленное досчитывание до цели
        const e = p >= 1 ? 1 : 1 - Math.pow(2, -10 * p);
        setV(Math.round(end * e));
        if (p < 1) requestAnimationFrame(tick);
        else setV(end);
      };
      requestAnimationFrame(tick);
    };
    const visible = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.9 && r.bottom > 0;
    };
    if (visible()) {
      start();
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end]);

  return <b ref={ref}>{prefix}{v}{suffix}</b>;
}
