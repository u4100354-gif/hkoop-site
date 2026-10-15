import PageHero from "../../components/PageHero";
import OrganizationsCatalog, { type Organization } from "../../components/OrganizationsCatalog";
import { q } from "../../lib/db";

export default async function Orgs() {
  let organizations: Organization[] = [];
  try {
    organizations = await q<Organization>("SELECT id,name,kind,district,sphere,chair,phone,email,address FROM organizations ORDER BY district,name");
  } catch (error) {
    // До применения миграции реестра сохраняем страницу доступной, не показываем выдуманные контакты.
    console.error("Не удалось загрузить каталог организаций:", error instanceof Error ? error.message : error);
  }

  return (
    <>
      <PageHero eyebrow="ХКООП · состав" title="Членские организации" sub="Каталог профорганизаций края с контактами." />
      <section className="section">
        <OrganizationsCatalog items={organizations} />
      </section>
    </>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Членские организации — ХКООП",
  description: "Каталог членских организаций и координационных советов ХКООП.",
};
