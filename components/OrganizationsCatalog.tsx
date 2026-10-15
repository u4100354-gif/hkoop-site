"use client";

import { useMemo, useState } from "react";

export type Organization = {
  id: string;
  name: string;
  kind: "org" | "council";
  district: string;
  sphere: string;
  chair: string;
  phone: string;
  email: string;
  address: string;
};

export default function OrganizationsCatalog({ items }: { items: Organization[] }) {
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("all");
  const [sphere, setSphere] = useState("all");

  const districts = useMemo(() => [...new Set(items.map((item) => item.district).filter(Boolean))].sort((a, b) => a.localeCompare(b, "ru")), [items]);
  const spheres = useMemo(() => [...new Set(items.map((item) => item.sphere).filter(Boolean))].sort((a, b) => a.localeCompare(b, "ru")), [items]);
  const filtered = items.filter((item) => {
    const text = [item.name, item.chair, item.district, item.sphere, item.address].join(" ").toLocaleLowerCase("ru");
    return (district === "all" || item.district === district)
      && (sphere === "all" || item.sphere === sphere)
      && text.includes(query.trim().toLocaleLowerCase("ru"));
  });

  if (!items.length) {
    return (
      <section className="org-empty" aria-labelledby="org-empty-title">
        <h2 id="org-empty-title">Каталог готовится</h2>
        <p>Актуальный реестр членских организаций и координационных советов пока не внесён. Чтобы получить контакт, позвоните в аппарат ХКООП: <a href="tel:+74212328718">8 (4212) 32-87-18</a> или напишите на <a href="mailto:ksps-priem@mail.ru">ksps-priem@mail.ru</a>.</p>
      </section>
    );
  }

  return (
    <>
      <div className="org-toolbar" aria-label="Фильтры организаций">
        <label>Поиск<input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Название, председатель, адрес…" /></label>
        <label>Район / муниципалитет<select value={district} onChange={(e) => setDistrict(e.target.value)}><option value="all">Все территории</option>{districts.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label>Сфера деятельности<select value={sphere} onChange={(e) => setSphere(e.target.value)}><option value="all">Все сферы</option>{spheres.map((value) => <option key={value}>{value}</option>)}</select></label>
        {(query || district !== "all" || sphere !== "all") && <button type="button" className="org-reset" onClick={() => { setQuery(""); setDistrict("all"); setSphere("all"); }}>Сбросить</button>}
      </div>
      <p className="org-count" aria-live="polite">Найдено: {filtered.length} из {items.length}</p>
      {filtered.length ? <div className="org-grid">{filtered.map((item) => (
        <article className="org-card" key={item.id}>
          <div className="org-card-head"><span className="org-kind">{item.kind === "council" ? "Координационный совет" : "Членская организация"}</span><h2>{item.name}</h2></div>
          <dl>
            {item.district && <div><dt>Территория</dt><dd>{item.district}</dd></div>}
            {item.sphere && <div><dt>Сфера</dt><dd>{item.sphere}</dd></div>}
            {item.chair && <div><dt>Председатель</dt><dd>{item.chair}</dd></div>}
            {item.phone && <div><dt>Телефон</dt><dd><a href={`tel:${item.phone.replace(/[^+\d]/g, "")}`}>{item.phone}</a></dd></div>}
            {item.email && <div><dt>Электронная почта</dt><dd><a href={`mailto:${item.email}`}>{item.email}</a></dd></div>}
            {item.address && <div><dt>Адрес</dt><dd>{item.address}</dd></div>}
          </dl>
        </article>
      ))}</div> : <div className="org-empty" role="status"><h2>Ничего не найдено</h2><p>Измените запрос или сбросьте фильтры.</p></div>}
    </>
  );
}
