"use client";
import { useState } from "react";

type P = { id: string; name: string; url: string; logo: string };

function Logo({ p }: { p: P }) {
  const [err, setErr] = useState(false);
  return (
    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: "100%" }}>
      <span className="plogo">{!err && <img src={p.logo} alt="" loading="lazy" onError={() => setErr(true)} />}</span>
      <span style={{ fontSize: 12, fontWeight: 700, textAlign: "center", lineHeight: 1.25 }}>{p.name}</span>
    </span>
  );
}

export default function PartnersStrip({ items }: { items: P[] }) {
  return (
    <div className="partners-grid">
      {items.map((p) => (
        <a key={p.id} className="partner-card" href={p.url} target="_blank" rel="noreferrer" title={p.name}>
          <Logo p={p} />
        </a>
      ))}
    </div>
  );
}
