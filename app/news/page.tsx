import NewsFilter from "../../components/NewsFilter";
import PageHero from "../../components/PageHero";
import { q, parseTags } from "../../lib/db";

export default async function NewsPage() {
  const rows: any[] = await q("SELECT id,title,DATE_FORMAT(date,'%Y-%m-%d') AS date,category,tags,excerpt FROM news ORDER BY date DESC");
  const items = rows.map((n) => ({ ...n, tags: parseTags(n.tags) }));
  return (
    <>
      <PageHero eyebrow="ХКООП · информируем" title="Новости" sub="Категории, теги, поиск. Полные тексты — на карточках." />
      <NewsFilter items={items} />
    </>
  );
}
