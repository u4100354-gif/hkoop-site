import mysql from "mysql2/promise";
import fs from "fs";

const pool = await mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "hkoop",
  password: process.env.DB_PASS || "HkoopLocal2026!",
  database: process.env.DB_NAME || "hkoop",
});

const [news] = await pool.query("SELECT id, title, excerpt, tags FROM news");
const [docs] = await pool.query("SELECT id, title, file_local FROM documents");
const [honor] = await pool.query("SELECT id, fio, title, year FROM honor");
const [events] = await pool.query("SELECT id, title, date, type FROM events");
const [partners] = await pool.query("SELECT id, name, url FROM partners");

const idx = [
  ...news.map((n) => ({
    title: n.title,
    url: `/news/${n.id}`,
    tag: "новость",
    text: `${n.title} ${n.excerpt || ""} ${n.tags || ""}`.toLowerCase(),
  })),
  ...docs.map((d) => ({
    title: d.title,
    url: d.file_local ? d.file_local : "/docs",
    tag: "документ",
    text: `${d.title}`.toLowerCase(),
  })),
  ...honor.map((h) => ({
    title: `${h.fio}${h.title ? ` — ${h.title}` : ""}`,
    url: `/honor/${h.id}`,
    tag: "книга почёта",
    text: `${h.fio} ${h.title || ""} ${h.year || ""} книга почета ветераны награды`.toLowerCase(),
  })),
  ...events.map((e) => ({
    title: e.title,
    url: "/events",
    tag: "мероприятие",
    text: `${e.title} ${e.date || ""} ${e.type || ""} мероприятия календарь`.toLowerCase(),
  })),
  ...partners.map((p) => ({
    title: p.name,
    url: "/partners",
    tag: "партнёр",
    text: `${p.name} партнеры сотрудничество`.toLowerCase(),
  })),
  ...[
    ["О нас", "/about", "история союз профобъединение 1948 органы конференция"],
    ["Деятельность", "/activity", "правозащита охрана труда соцпартнёрство молодёжь международное"],
    ["Книга Почёта", "/honor", "ветераны награды признание профили"],
    ["Партнёры", "/partners", "фнпр правительство фонды вузы организации"],
    ["Контакты", "/contacts", "адрес телефон email муравьёва горячая линия консультация"],
    ["Мероприятия", "/events", "календарь анонсы форум совет"],
    ["Членские организации", "/organizations", "реестр первички координационные советы"],
    ["Документы", "/docs", "планы соглашения программы pdf политика"],
  ].map(([title, url, text]) => ({ title, url, tag: "раздел", text: `${title} ${text}`.toLowerCase() })),
];

fs.writeFileSync("public/search-index.json", JSON.stringify(idx));
console.log("search index items:", idx.length);
await pool.end();
