import PageHero from "../../components/PageHero";
import PartnersStrip from "../../components/PartnersStrip";
import { q } from "../../lib/db";

export default async function Partners() {
  const partners: any[] = await q("SELECT * FROM partners ORDER BY name");
  return (
    <>
      <PageHero eyebrow="ХКООП · вместе" title="Партнёры" sub="14 организаций: ФНПР, правительство края, фонды, вузы, надзор." />
      <section className="section">
        <PartnersStrip items={partners} />
      </section>
    </>
  );
}
