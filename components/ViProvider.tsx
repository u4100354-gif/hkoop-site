"use client";
import { useEffect, useState } from "react";
import { lsGet, lsSet } from "../lib/storage";

export default function ViProvider() {
  const [vi, setVi] = useState(false);
  const [big, setBig] = useState(false);
  const [noimg, setNoimg] = useState(false);

  useEffect(() => {
    const v = lsGet("hkoop-vi") === "1";
    setVi(v);
    if (v) document.body.classList.add("vi-mode");
    setBig(lsGet("hkoop-vi-big") === "1");
    setNoimg(lsGet("hkoop-vi-noimg") === "1");
  }, []);

  const toggle = () => {
    const nv = !vi;
    setVi(nv);
    lsSet("hkoop-vi", nv ? "1" : "0");
    document.body.classList.toggle("vi-mode", nv);
    (window as any).__hkoop_vi = nv;
    window.dispatchEvent(new Event("hkoop-vi"));
  };

  useEffect(() => {
    document.body.classList.toggle("vi-big", big);
    lsSet("hkoop-vi-big", big ? "1" : "0");
    document.body.classList.toggle("vi-noimg", noimg);
    lsSet("hkoop-vi-noimg", noimg ? "1" : "0");
  }, [big, noimg]);

  useEffect(() => {
    (window as any).toggleVi = toggle;
    return () => {};
  });

  if (!vi) return null;
  return (
    <div className="vi-panel">
      <div className="container">
        <strong>Версия для слабовидящих</strong>
        <button onClick={() => setBig(!big)} aria-pressed={big}>Шрифт: {big ? "очень крупный" : "крупный"}</button>
        <button onClick={() => setNoimg(!noimg)} aria-pressed={noimg}>Картинки: {noimg ? "выкл" : "вкл"}</button>
        <button onClick={toggle}>Обычная версия</button>
      </div>
    </div>
  );
}
