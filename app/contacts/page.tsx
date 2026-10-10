import PageHero from "../../components/PageHero";
import ConsultForm from "../../components/ConsultForm";
import MapGate from "../../components/MapGate";
import { safeHref } from "../../lib/url";
import { q } from "../../lib/db";

export default async function Contacts() {
  const rows: any[] = await q("SELECT `key`,value FROM site_settings");
  const s: Record<string, string> = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  const vk = safeHref(s.social_vk);
  const tg = safeHref(s.social_tg);
  const mx = safeHref(s.social_max);
  return (
    <>
      <PageHero eyebrow="ХКООП · на связи" title="Контакты" sub={s.address || "680000, г. Хабаровск, ул. Муравьева-Амурского, 4"} />
      <section className="section consult-band">
        <div>
          <h2>Как нас найти</h2>
          <p><b>{s.phone}</b>{s.fax ? ` · факс ${s.fax}` : ""}</p>
          <p>{s.email}</p>
          <p>{s.hours}</p>
          <p>{vk ? <a href={vk}>VK</a> : "VK"} · {tg ? <a href={tg}>Telegram</a> : "Telegram"} · {mx ? <a href={mx}>MAX</a> : "MAX"}</p>
          <div className="map-box">
            <MapGate />
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
