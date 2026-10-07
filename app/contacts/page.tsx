import PageHero from "../../components/PageHero";
import ConsultForm from "../../components/ConsultForm";
import { q } from "../../lib/db";

export default async function Contacts() {
  const rows: any[] = await q("SELECT `key`,value FROM site_settings");
  const s: Record<string, string> = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return (
    <>
      <PageHero eyebrow="ХКООП · на связи" title="Контакты" sub={s.address || "680000, г. Хабаровск, ул. Муравьева-Амурского, 4"} />
      <section className="section consult-band">
        <div>
          <h2>Как нас найти</h2>
          <p><b>{s.phone}</b>{s.fax ? ` · факс ${s.fax}` : ""}</p>
          <p>{s.email}</p>
          <p>{s.hours}</p>
          <p><a href={s.social_vk}>VK</a> · <a href={s.social_tg}>Telegram</a> · <a href={s.social_max}>MAX</a></p>
          <div className="map-box">
            <iframe src="https://yandex.ru/map-widget/v1/?ll=135.0711%2C48.4739&z=16&pt=135.0711%2C48.4739%2Cpm2rdm&text=%D0%A5%D0%B0%D0%B1%D0%B0%D1%80%D0%BE%D0%B2%D1%81%D0%BA%2C%20%D1%83%D0%BB.%20%D0%9C%D1%83%D1%80%D0%B0%D0%B2%D1%8C%D1%91%D0%B2%D0%B0-%D0%90%D0%BC%D1%83%D1%80%D1%81%D0%BA%D0%BE%D0%B3%D0%BE%2C%204" width="100%" height="300" frameBorder="0" title="Карта: ХКООП, Хабаровск"></iframe>
          </div>
        </div>
        <div className="card"><div className="card-body">
          <h2>Бесплатная консультация</h2>
          <ConsultForm />
        </div></div>
      </section>
    </>
  );
}
