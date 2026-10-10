"use client";
import { useState } from "react";
import { safeHref, safeImgSrc } from "../lib/url";

type P = { id: string; name: string; url: string; logo: string };

function Logo({ p }: { p: P }) {
  const [err, setErr] = useState(false);
  const src = safeImgSrc(p.logo);
  return (
    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: "100%" }}>
      <span className="plogo">{!err && src && <img src={src} alt="" loading="lazy" onError={() => setErr(true)} />}</span>
      <span style={{ fontSize: 12, fontWeight: 700, textAlign: "center", lineHeight: 1.25 }}>{p.name}</span>
    </span>
  );
}

export default function PartnersStrip({ items }: { items: P[] }) {
  return (
    <div className="partners-grid">
      {items.map((p) => {
        const href = safeHref(p.url);
        if (!href)
          return (
            <span key={p.id} className="partner-card" title={p.name}>
              <Logo p={p} />
            </span>
          );
        return (
          <a key={p.id} className="partner-card" href={href} target="_blank" rel="noreferrer" title={p.name}>
            <Logo p={p} />
          </a>
        );
      })}
    </div>
  );
}
