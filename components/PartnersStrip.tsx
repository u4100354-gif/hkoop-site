"use client";
import { useState } from "react";
import { safeHref, safeImgSrc } from "../lib/url";

type P = { id: string; name: string; url: string; logo: string };

function Logo({ p, compact = false }: { p: P; compact?: boolean }) {
  const [err, setErr] = useState(false);
  const src = safeImgSrc(p.logo);
  return (
    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: compact ? 6 : 8, width: "100%" }}>
      <span className="plogo">{!err && src && <img src={src} alt={p.name} loading="lazy" width={compact ? 104 : 130} height={compact ? 52 : 72} onError={() => setErr(true)} />}</span>
      <span style={{ fontSize: compact ? 11.5 : 12, fontWeight: 700, textAlign: "center", lineHeight: 1.25 }}>{p.name}</span>
    </span>
  );
}

export default function PartnersStrip({ items, compact = false }: { items: P[]; compact?: boolean }) {
  return (
    <div className="partners-grid">
      {items.map((p) => {
        const href = safeHref(p.url);
        if (!href)
          return (
            <span key={p.id} className="partner-card" title={p.name}>
              <Logo p={p} compact={compact} />
            </span>
          );
        return (
          <a key={p.id} className="partner-card" href={href} target="_blank" rel="noreferrer" title={p.name}>
            <Logo p={p} compact={compact} />
          </a>
        );
      })}
    </div>
  );
}
