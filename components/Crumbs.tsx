import Link from "next/link";

export type Crumb = { href?: string; label: string };

/** Хлебные крошки в стиле сайта: Главная / Раздел / текущая. */
export default function Crumbs({ items }: { items: Crumb[] }) {
  const last = items[items.length - 1];
  const rest = items.slice(0, -1);
  return (
    <nav className="crumbs" aria-label="Хлебные крошки">
      <Link href="/">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 3l9 8h-3v9h-4v-6H10v6H6v-9H3l9-8z" />
        </svg>
        Главная
      </Link>
      {rest.map((c) => (
        <span key={c.href} className="crumb-item">
          <span className="crumb-sep" aria-hidden="true">›</span>
          {c.href ? <Link href={c.href}>{c.label}</Link> : <span className="cur">{c.label}</span>}
        </span>
      ))}
      {last && (
        <span className="crumb-item">
          <span className="crumb-sep" aria-hidden="true">›</span>
          <span className="cur" aria-current="page" title={last.label}>{last.label}</span>
        </span>
      )}
    </nav>
  );
}
