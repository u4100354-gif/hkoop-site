"use client";
import { useEffect, useRef, useState } from "react";

export default function Counter({ end, prefix = "", suffix = "" }: { end: number; prefix?: string; suffix?: string }) {
  // Показываем итоговое значение сразу (никогда не 0), оживляем при появлении
  const [v, setV] = useState(end);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting && !done.current) {
          done.current = true;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / 1200);
            setV(Math.round(end * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end]);

  return <b ref={ref}>{prefix}{v}{suffix}</b>;
}
