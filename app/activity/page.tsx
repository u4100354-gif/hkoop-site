import Link from "next/link";
import ActSceneNav from "../../components/ActSceneNav";

const scenes = [
  {
    id: "pravo",
    num: "01",
    theme: "dark",
    accent: "#e05252",
    v: "v-pravo",
    eyebrow: "Правозащита",
    title: "Право — на вашей стороне",
    text: [
      "Горячая линия по трудовому праву работает в рабочее время: юристы края подскажут, как действовать при увольнении, задержке зарплаты или споре с работодателем. Консультации бесплатны для членов профсоюза.",
      "Помимо линии: мониторинг рынка труда, разборы типовых ситуаций и образцы заявлений — на странице новостей направления и в контактах.",
    ],
    facts: ["8 (4212) 32-87-18", "Пн-Чт 9:00–18:00 · Пт 9:00–16:20", "Бесплатно для членов"],
    ctas: [
      { href: "/news", label: "Новости направления →" },
      { href: "/contacts", label: "Задать вопрос →" },
    ],
  },
  {
    id: "ohrana",
    num: "02",
    theme: "dark",
    accent: "#ff9d9d",
    v: "v-ohrana",
    eyebrow: "Охрана труда",
    title: "Безопасное рабочее место — не привилегия",
    text: [
      "Техническая инспекция труда профсоюза участвует в расследованиях несчастных случаев и контролирует условия труда на предприятиях края.",
      "Собираем и переводим на понятный язык рекомендации ФНПР: от правильного оформления инструктажей до того, что делать пострадавшему и его семье.",
    ],
    facts: ["Расследования НС", "Рекомендации ФНПР", "Проверки на предприятиях"],
    ctas: [{ href: "/news", label: "Новости направления →" }],
  },
  {
    id: "socpart",
    num: "03",
    theme: "dark",
    accent: "#f0c264",
    v: "v-socpart",
    eyebrow: "Социальное партнёрство",
    title: "Договариваемся на равных",
    text: [
      "Отраслевые и краевые соглашения — главный инструмент профсоюза. Краевое трёхстороннее соглашение 2026–2028 фиксирует обязательства работодателей и власти края перед работниками.",
      "ХКООП входит в краевую трёхстороннюю комиссию и отстаивает условия по зарплатам, занятости и охране труда до подписания документа.",
    ],
    facts: ["Трёхстороннее соглашение 2026–2028", "Генсоглашение ФНПР", "КРК"],
    ctas: [{ href: "/docs", label: "Текст соглашений →" }],
  },
  {
    id: "molodezh",
    num: "04",
    theme: "dark",
    accent: "#9ae6b4",
    v: "v-molodezh",
    eyebrow: "Молодёжный совет",
    title: "Молодёжь решает",
    text: [
      "Первый форум трудящейся молодёжи «Профмолодёжь Приамурья» собрал актив со всего региона — и это только начало: молодёжные советы работают в членских организациях.",
      "Молодёжный совет ХКООП ведёт свои проекты и предлагает идеи на уровне края — от стажировок до культурных событий.",
    ],
    facts: ["Форум «Профмолодёжь Приамурья»", "Молодёжные советы по отраслям", "Свои проекты"],
    ctas: [{ href: "/news", label: "Новости направления →" }],
  },
  {
    id: "mezhdunar",
    num: "05",
    theme: "dark",
    accent: "#7fe0c8",
    v: "v-mezhdunar",
    eyebrow: "Международное сотрудничество",
    title: "Соседи по Амуру",
    text: [
      "Работаем с профсоюзами китайской провинции Хэйлунцзян: подписаны соглашения с федерациями профсоюзов Харбина, Фуюаня и провинции.",
      "Приграничное сотрудничество — это обмен делегациями, совместные мероприятия и поддержка трудовых мигрантов: работники с обеих сторон границы могут рассчитывать на консультацию.",
    ],
    facts: ["Харбин", "Фуюань", "Хэйлунцзян", "Обмен делегациями"],
    ctas: [{ href: "/news", label: "Новости направления →" }],
  },
  {
    id: "org",
    num: "06",
    theme: "light",
    accent: "#b8860b",
    v: "v-org",
    eyebrow: "Организационная работа",
    title: "Профсоюз — это организация людей",
    text: [
      "Планы работы, конференции, координационные советы в муниципалитетах и членские организации: аппарат ХКООП помогает первичкам выстраивать работу — от устава до отчётной кампании.",
      "Материалы для председателей первичных организаций и планы текущего года собраны в разделе «Документы».",
    ],
    facts: ["Планы-2026", "Координационные советы", "Поддержка первичек"],
    ctas: [
      { href: "/organizations", label: "Членские организации →" },
      { href: "/docs", label: "Планы и положения →" },
    ],
  },
];

export default function Activity() {
  return (
    <div className="act-page">
      <ActSceneNav scenes={scenes.map((x) => ({ id: x.id, label: x.eyebrow, accent: x.accent }))} />
      {scenes.map((s, i) => (
        <section key={s.id} id={s.id} className={`act-scene ${s.theme === "dark" ? "act-dark" : "act-light"} ${s.v}`}>
          <span className="act-wm" aria-hidden="true">{s.num}</span>
            <span className="act-glow" aria-hidden="true" />
            <div className="container act-inner">
            <p className="act-num act-r reveal" style={{ "--i": 0 } as React.CSSProperties}>{s.num}</p>
            <p className="act-eyebrow act-r reveal" style={{ "--i": 1 } as React.CSSProperties}>{s.eyebrow}</p>
            <h2 className="act-title act-r reveal" style={{ "--i": 2 } as React.CSSProperties}>{s.title}</h2>
            <div className="act-text act-r reveal" style={{ "--i": 3 } as React.CSSProperties}>
              {s.text.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
            <div className="act-facts">
              {s.facts.map((f, k) => (
                <span key={f} className="act-fact reveal" style={{ "--i": k } as React.CSSProperties}>{f}</span>
              ))}
            </div>
            <div className="act-ctas act-r reveal" style={{ "--i": 4 } as React.CSSProperties}>
              {s.ctas.map((c) => (
                <Link key={c.href + c.label} href={c.href} className={s.v === "v-pravo" && i === 0 && c.label.startsWith("Новости") ? "act-btn-white" : "act-link"}>
                  {c.label}
                </Link>
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
