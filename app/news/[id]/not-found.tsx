import Crumbs from "../../../components/Crumbs";

export default function NewsNotFound() {
  return (
    <>
      <Crumbs items={[{ href: "/news", label: "Новости" }, { label: "Не найдено" }]} />
      <h1>Не найдено</h1>
      <p>Такой новости нет. Возможно, ссылка устарела.</p>
    </>
  );
}
