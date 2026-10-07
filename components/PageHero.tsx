export default function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <section className="page-hero reveal">
      <p className="aeyebrow">{eyebrow}</p>
      <h1 className="atitle">{title}</h1>
      {sub && <p className="asub">{sub}</p>}
    </section>
  );
}
