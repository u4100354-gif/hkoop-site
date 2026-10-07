import DocsFilter from "../../components/DocsFilter";
import PageHero from "../../components/PageHero";
import { q } from "../../lib/db";

export default async function DocsPage() {
  const docs: any[] = await q("SELECT * FROM documents ORDER BY year DESC");
  return (
    <>
      <PageHero eyebrow="ХКООП · база" title="Документы" sub="Каталог с поиском и встроенным просмотром PDF." />
      <DocsFilter items={docs} />
      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-body">
          <strong>152-ФЗ:</strong> <a href="/docs/politika.pdf">Политика конфиденциальности (PDF)</a> ·{" "}
          <a href="/docs/plan-raboty-2026.pdf">План 2026 (PDF)</a>
        </div>
      </div>
    </>
  );
}
