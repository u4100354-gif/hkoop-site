import PageHero from "../../components/PageHero";

export default function Orgs() {
  return (
    <>
      <PageHero eyebrow="ХКООП · состав" title="Членские организации" sub="Каталог профорганизаций края с контактами." />
      <section className="section">
        <div className="card"><div className="card-body">
          <p>Список членских организаций и координационных советов — запросить у аппарата актуальный реестр.</p>
          <p><small>Структура карточки: название → председатель → телефон → email → адрес.</small></p>
        </div></div>
      </section>
    </>
  );
}
