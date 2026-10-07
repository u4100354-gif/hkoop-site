"use client";
import { useEffect, useState } from "react";

export default function ViProvider() {
  const [vi, setVi] = useState(false);
  const [big, setBig] = useState(false);
  const [noimg, setNoimg] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem("hkoop-vi") === "1";
    setVi(v);
    if (v) document.body.classList.add("vi-mode");
  }, []);

  const toggle = () => {
    const nv = !vi;
    setVi(nv);
    localStorage.setItem("hkoop-vi", nv ? "1" : "0");
    document.body.classList.toggle("vi-mode", nv);
    (window as any).__hkoop_vi = nv;
    window.dispatchEvent(new Event("hkoop-vi"));
  };

  useEffect(() => {
    document.body.classList.toggle("vi-big", big);
    document.body.classList.toggle("vi-noimg", noimg);
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
        <button onClick={() => setBig(!big)}>Шрифт: {big ? "очень крупный" : "крупный"}</button>
        <button onClick={() => setNoimg(!noimg)}>Картинки: {noimg ? "выкл" : "вкл"}</button>
        <button onClick={toggle}>Обычная версия</button>
      </div>
    </div>
  );
}
