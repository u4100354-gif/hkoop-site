"use client";
import { useEffect, useState } from "react";

type Scheme = "bw" | "wb" | "yb";

const SCHEME_LABEL: Record<Scheme, string> = {
  bw: "Чёрным по белому",
  wb: "Белым по чёрному",
  yb: "Жёлтым по чёрному",
};

export default function ViProvider() {
  const [vi, setVi] = useState(false);
  const [size, setSize] = useState<1 | 2 | 3>(1);
  const [scheme, setScheme] = useState<Scheme>("bw");
  const [spacing, setSpacing] = useState(false);
  const [noimg, setNoimg] = useState(false);

  useEffect(() => {
    setVi(localStorage.getItem("hkoop-vi") === "1");
    const s = Number(localStorage.getItem("hkoop-vi-size") || 1) as 1 | 2 | 3;
    const sch = (localStorage.getItem("hkoop-vi-scheme") as Scheme) || "bw";
    setSize(s);
    setScheme(sch);
    setSpacing(localStorage.getItem("hkoop-vi-spacing") === "1");
    setNoimg(localStorage.getItem("hkoop-vi-noimg") === "1");
  }, []);

  useEffect(() => {
    const b = document.body;
    b.classList.toggle("vi-mode", vi);
    b.classList.toggle("vi-size-1", vi && size === 1);
    b.classList.toggle("vi-size-2", vi && size === 2);
    b.classList.toggle("vi-size-3", vi && size === 3);
    b.classList.toggle("vi-scheme-bw", vi && scheme === "bw");
    b.classList.toggle("vi-scheme-wb", vi && scheme === "wb");
    b.classList.toggle("vi-scheme-yb", vi && scheme === "yb");
    b.classList.toggle("vi-spacing", vi && spacing);
    b.classList.toggle("vi-noimg", vi && noimg);
  }, [vi, size, scheme, spacing, noimg]);

  useEffect(() => {
    const toggle = () => {
      setVi((v) => {
        const nv = !v;
        localStorage.setItem("hkoop-vi", nv ? "1" : "0");
        return nv;
      });
      window.dispatchEvent(new Event("hkoop-vi"));
    };
    (window as any).toggleVi = toggle;
    return () => { delete (window as any).toggleVi; };
  }, []);

  const set = (k: string, v: string, fn: () => void) => {
    localStorage.setItem(k, v);
    fn();
  };

  const disableVi = () => {
    localStorage.setItem("hkoop-vi", "0");
    setVi(false);
    window.dispatchEvent(new Event("hkoop-vi"));
  };

  if (!vi) return null;
  return (
    <div className="vi-panel">
      <div className="container vi-inner">
        <strong className="vi-title">Версия для слабовидящих</strong>

        <span className="vi-group" role="group" aria-label="Размер шрифта">
          <span className="vi-label">Шрифт:</span>
          {([1, 2, 3] as const).map((s) => (
            <button key={s} className={size === s ? "on" : ""} onClick={() => set("hkoop-vi-size", String(s), () => setSize(s))}>
              {s === 1 ? "Обычный" : s === 2 ? "Крупный" : "Очень крупный"}
            </button>
          ))}
        </span>

        <span className="vi-group" role="group" aria-label="Цветовая схема">
          <span className="vi-label">Цвет:</span>
          {(Object.keys(SCHEME_LABEL) as Scheme[]).map((s) => (
            <button key={s} className={scheme === s ? "on" : ""} onClick={() => set("hkoop-vi-scheme", s, () => setScheme(s))} title={SCHEME_LABEL[s]}>
              {SCHEME_LABEL[s]}
            </button>
          ))}
        </span>

        <button className={spacing ? "on" : ""} onClick={() => set("hkoop-vi-spacing", spacing ? "0" : "1", () => setSpacing(!spacing))}>
          Интервал
        </button>
        <button className={noimg ? "on" : ""} onClick={() => set("hkoop-vi-noimg", noimg ? "0" : "1", () => setNoimg(!noimg))}>
          {noimg ? "Картинки: выкл" : "Картинки: вкл"}
        </button>
        <button onClick={disableVi}>Обычная версия</button>
      </div>
    </div>
  );
}
