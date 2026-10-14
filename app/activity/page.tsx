import Link from "next/link";
import ActSceneNav from "../../components/ActSceneNav";

const scenes: {
  id: string; num: string; theme: string; v: string; accent: string;
  eyebrow: string; title: string; text: string[];
  facts: { label: string; href?: string }[];
  ctas: { href: string; label: string; filled?: boolean }[];
}[] = [
  {
    id: "pravo",
    num: "01",
    theme: "dark",
    v: "v-pravo",
    accent: "#e05252",
    eyebrow: "Правозащита",
    title: "Право — на вашей стороне",
    text: [
      "Горячая линия по трудовому праву работает в рабочее время: юристы края подскажут, как действовать при увольнении, задержке зарплаты или споре с работодателем. Консультации бесплатны для членов профсоюза.",
      "Помимо линии: мониторинг рынка труда, разборы типовых ситуаций и образцы заявлений — на странице новостей направления и в контактах.",
    ],
    facts: [
      { label: "8 (4212) 32-87-18", href: "tel:+784212328718" },
      { label: "Пн-Чт 9:00–18:00 · Пт 9:00–16:20" },
      { label: "Бесплатно для членов профсоюза" },
    ],
    ctas: [
      { href: "/news?category=novosti", label: "Новости направления" },
      { href: "/contacts", label: "Задать вопрос" },
    ],
  },
  {
    id: "ohrana",
    num: "02",
    theme: "dark",
    v: "v-ohrana",
    accent: "#ff9d9d",
    eyebrow: "Охрана труда",
    title: "Безопасное рабочее место — не привилегия",
    text: [
      "Техническая инспекция труда профсоюза участвует в расследованиях несчастных случаев и контролирует условия труда на предприятиях края.",
      "Собираем и переводим на понятный язык рекомендации ФНПР: от правильного оформления инструктажей до того, что делать пострадавшему и его семье.",
    ],
    facts: [
      { label: "Расследования НС" },
      { label: "Рекомендации ФНПР" },
      { label: "Проверки на предприятиях" },
    ],
    ctas: [
      { href: "/news?category=ohrana-truda", label: "Новости направления", filled: true },
    ],
  },
  {
    id: "socpart",
    num: "03",
    theme: "dark",
    v: "v-socpart",
    accent: "#f0c264",
    eyebrow: "Социальное партнёрство",
    title: "Договариваемся на равных",
    text: [
      "Отраслевые и краевые соглашения — главный инструмент профсоюза. Краевое трёхстороннее соглашение 2026–2028 фиксирует обязательства работодателей и власти края перед работниками.",
      "ХКООП входит в краевую трёхстороннюю комиссию и отстаивает условия по зарплатам, занятости и охране труда до подписания документа.",
    ],
    facts: [
      { label: "Трёхстороннее соглашение 2026–2028" },
      { label: "Генсоглашение ФНПР" },
      { label: "КРК" },
    ],
    ctas: [
      { href: "/docs", label: "Текст соглашений", filled: true },
    ],
  },
  {
    id: "molodezh",
    num: "04",
    theme: "dark",
    v: "v-molodezh",
    accent: "#9ae6b4",
    eyebrow: "Молодёжный совет",
    title: "Молодёжь решает",
    text: [
      "Первый форум трудящейся молодёжи «Профмолодёжь Приамурья» собрал актив со всего региона — и это только начало: молодёжные советы работают в членских организациях.",
      "Молодёжный совет ХКООП ведёт свои проекты и предлагает идеи на уровне края — от стажировок до культурных событий.",
    ],
    facts: [
      { label: "Форум «Профмолодёжь Приамурья»" },
      { label: "Молодёжные советы по отраслям" },
      { label: "Свои проекты" },
    ],
    ctas: [
      { href: "/news?category=molodezh", label: "Новости направления", filled: true },
    ],
  },
  {
    id: "mezhdunar",
    num: "05",
    theme: "dark",
    v: "v-mezhdunar",
    accent: "#b8d4f0",
    eyebrow: "Международное сотрудничество",
    title: "Соседи по Амуру",
    text: [
      "Работаем с профсоюзами китайской провинции Хэйлунцзян: подписаны соглашения с федерациями профсоюзов Харбина, Фуюаня и провинции.",
      "Приграничное сотрудничество — это обмен делегациями, совместные мероприятия и поддержка трудовых мигрантов: работники с обеих сторон границы могут рассчитывать на консультацию.",
    ],
    facts: [
      { label: "Харбин" },
      { label: "Фуюань" },
      { label: "Хэйлунцзян" },
      { label: "Обмен делегациями" },
    ],
    ctas: [
      { href: "/news?category=mezhdunarodnoe", label: "Новости направления", filled: true },
    ],
  },
  {
    id: "org",
    num: "06",
    theme: "light",
    v: "v-org",
    accent: "#8a6a12",
    eyebrow: "Организационная работа",
    title: "Профсоюз — это организация людей",
    text: [
      "Планы работы, конференции, координационные советы в муниципалитетах и членские организации: аппарат ХКООП помогает первичкам выстраивать работу — от устава до отчётной кампании.",
      "Материалы для председателей первичных организаций и планы текущего года собраны в разделе «Документы».",
    ],
    facts: [
      { label: "Планы-2026" },
      { label: "Координационные советы" },
      { label: "Поддержка первичек" },
    ],
    ctas: [
      { href: "/organizations", label: "Членские организации" },
      { href: "/docs", label: "Планы и положения" },
    ],
  },
];

export default function Activity() {
  return (
    <div className="act-page">
      <div className="act-pagehead">
        <div className="container">
          <h1>Деятельность</h1>
          <p>Шесть направлений: от горячей линии до международного сотрудничества.</p>
        </div>
      </div>
      <ActSceneNav scenes={scenes.map((x) => ({ id: x.id, label: x.eyebrow, accent: x.accent }))} />
      {scenes.map(() => null)}
      {scenes.map((s) => (
        <section key={s.id} id={s.id} className={`act-scene ${s.theme === "dark" ? "act-dark" : "act-light"} ${s.v}`}>
          <div className="container act-inner">
            <p className="act-num act-r reveal" style={{ "--i": 0 } as React.CSSProperties}>{s.num}</p>
            <p className="act-eyebrow act-r reveal" style={{ "--i": 1 } as React.CSSProperties}>{s.eyebrow}</p>
            <h2 className="act-title act-r reveal" style={{ "--i": 2 } as React.CSSProperties}>{s.title}</h2>
            <div className="act-ctas act-r reveal" style={{ "--i": 3 } as React.CSSProperties}>
              {s.ctas.map((c) => (
                <Link
                  key={c.href + c.label}
                  href={c.href}
                  className={s.theme !== "light" && c.filled ? "act-btn-white" : "act-link"}
                >
                  {c.label}
                  <span className="act-arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
            <div className="act-text act-r reveal" style={{ "--i": 4 } as React.CSSProperties}>
              {s.text.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
            <div className="act-facts">
              {s.facts.map((f, k) => (
                f.href ? (
                  <a key={f.label} href={f.href} className="act-fact act-fact-link reveal" style={{ "--i": k } as React.CSSProperties}>{f.label}</a>
                ) : (
                  <span key={f.label} className="act-fact reveal" style={{ "--i": k } as React.CSSProperties}>{f.label}</span>
                )
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Деятельность — ХКООП",
  description: "Направления деятельности ХКООП: правозащита, охрана труда, соцпартнёрство, молодёжный совет, международное сотрудничество.",
};
