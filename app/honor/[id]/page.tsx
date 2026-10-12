import type { Metadata } from "next";
import { q } from "../../../lib/db";
import Crumbs from "../../../components/Crumbs";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const rows: any[] = await q("SELECT fio FROM honor WHERE id=?", [params.id]);
  if (!rows[0]) return { title: "Профиль не найден — ХКООП" };
  return { title: `${rows[0].fio} — Книга Почёта ХКООП` };
}

export async function generateStaticParams() {
  const rows: any[] = await q("SELECT id FROM honor");
  return rows.map((h) => ({ id: h.id }));
}

export default async function HonorDetail({ params }: { params: { id: string } }) {
  const rows: any[] = await q("SELECT * FROM honor WHERE id=?", [params.id]);
  const h = rows[0];
  if (!h) return <><Crumbs items={[{ href: "/honor", label: "Книга Почёта" }, { label: "Не найдено" }]} /><h1>Не найдено</h1></>;
  return (
    <>
      <Crumbs items={[{ href: "/honor", label: "Книга Почёта" }, { label: h.fio }]} />
      <section className="honor-profile">
        <div className="honor-photo">
          {h.photo ? <img src={h.photo} alt={h.fio} width={300} height={400} /> : <div className="honor-stub">★</div>}
        </div>
        <div>
          <h1 style={{ margin: "0 0 6px" }}>{h.fio}</h1>
          <p><small>{h.title || "Книга Почёта ХКООП"} · {h.year}</small></p>
          {h.text && <div className="honor-text">{String(h.text).split("\n").filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}</div>}
        </div>
      </section>
    </>
  );
}
