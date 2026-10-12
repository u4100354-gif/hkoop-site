/**
 * Парсинг полных текстов новостей со старого сайта (habprof.ru, Joomla 3.10).
 *
 * Что делает:
 *  - читает id + old_url из news, где body IS NULL (или все с --force);
 *  - качает страницу, вырезает <div itemprop="articleBody"> (баланс div);
 *  - чистит HTML (allowlist тегов, режет скрипты/стили/обработчики);
 *  - скачивает картинки и файлы-приложения в public/images/old и public/docs/old;
 *  - пишет news.body.
 *
 * Запуск (нужен пользователь с UPDATE, т.е. root):
 *   read -s ROOTPW && DB_USER=root DB_PASS="$ROOTPW" node scripts/parse-old-site.mjs
 * Опции: --limit N (первые N), --only <id>, --dry (без записи в БД и скачивания),
 *        --force (перепарсить даже с непустым body).
 */
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BASE = "http://habprof.ru";
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) HkoopBot/1.0 (+https://u4100354-gif.github.io/)";

const args = process.argv.slice(2);
const opt = (n) => {
  const i = args.indexOf(n);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : null;
};
const LIMIT = Number(opt("--limit") || 0);
const ONLY = opt("--only");
const DRY = args.includes("--dry");
const FORCE = args.includes("--force");

const IMG_DIR = path.join(ROOT, "public", "images", "old");
const DOC_DIR = path.join(ROOT, "public", "docs", "old");
const DOC_EXT = new Set(["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "zip", "rar", "7z", "odt", "ods"]);
const IMG_EXT = new Set(["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url, tries = 3) {
  for (let k = 0; k < tries; k++) {
    try {
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), 25000);
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: ctl.signal });
      clearTimeout(t);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.text();
    } catch (e) {
      if (k === tries - 1) throw e;
      await sleep(1500 * (k + 1));
    }
  }
}

async function fetchBin(url) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 40000);
  try {
    const r = await fetch(url, { headers: { "User-Agent": UA, Referer: BASE + "/" }, signal: ctl.signal });
    if (!r.ok) return null;
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length > 8 * 1024 * 1024) return null;
    return { buf, type: r.headers.get("content-type") || "" };
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

/** Вырезать innerHTML блока articleBody с учётом вложенных div. */
function extractArticleBody(html) {
  const marker = 'itemprop="articleBody"';
  const mi = html.indexOf(marker);
  if (mi < 0) return null;
  const ds = html.lastIndexOf("<div", mi);
  if (ds < 0) return null;
  const tagEnd = html.indexOf(">", mi);
  if (tagEnd < 0) return null;
  const re = /<\/?div\b[^>]*>/gi;
  re.lastIndex = tagEnd + 1;
  let depth = 1;
  let m;
  while ((m = re.exec(html))) {
    if (m[0][1] === "/") depth--;
    else depth++;
    if (depth === 0) return html.slice(tagEnd + 1, m.index);
  }
  return null;
}

const ALLOWED = new Set(["p", "div", "span", "br", "b", "strong", "i", "em", "u", "a", "img", "ul", "ol", "li", "h2", "h3", "h4", "blockquote", "table", "thead", "tbody", "tr", "td", "th", "figure", "figcaption", "hr"]);

function absUrl(u) {
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith("//")) return "http:" + u;
  if (u.startsWith("/")) return BASE + u;
  return BASE + "/" + u;
}

function cleanTag(tag, attrs, pageBase) {
  const t = tag.toLowerCase();
  if (!ALLOWED.has(t)) return "";
  if (t === "br" || t === "hr") return `<${t}>`;
  if (t === "img") {
    const src = (attrs.match(/\ssrc\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/i) || [])[1] || "";
    const alt = (attrs.match(/\salt\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/i) || [])[1] || '""';
    const clean = src.replace(/^["']|["']$/g, "");
    if (!clean || clean.startsWith("data:")) return "";
    return `<img src="${absUrl(clean)}" alt=${alt}>`;
  }
  if (t === "a") {
    const href = (attrs.match(/\shref\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/i) || [])[1] || "";
    const clean = href.replace(/^["']|["']$/g, "");
    if (!clean || /^(javascript|vbscript):/i.test(clean) || clean.startsWith("#")) return "";
    return `<a href="${absUrl(clean)}">`;
  }
  if (t === "td" || t === "th") {
    const cs = (attrs.match(/\scolspan\s*=\s*("[^"]*"|'[^']*'|\d+)/i) || [])[1] || "";
    const rs = (attrs.match(/\srowspan\s*=\s*("[^"]*"|'[^']*'|\d+)/i) || [])[1] || "";
    return `<${t}${cs ? ` colspan=${cs}` : ""}${rs ? ` rowspan=${rs}` : ""}>`;
  }
  return `<${t}>`;
}

function cleanBody(inner) {
  let s = inner;
  s = s.replace(/<script[\s\S]*?<\/script\s*>/gi, "")
    .replace(/<style[\s\S]*?<\/style\s*>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript\s*>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<iframe[\s\S]*?(<\/iframe\s*>|\/>)/gi, "")
    .replace(/\s+on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s+style\s*=\s*("[^"]*"|'[^']*')/gi, "");
  s = s.replace(/<\/?([a-zA-Z0-9]+)((?:\s[^<>]*)?)\s*\/?>/g, (m, tag, attrs) => {
    const isClose = m.startsWith("</");
    const t = tag.toLowerCase();
    if (!ALLOWED.has(t)) return "";
    if (isClose) return (t === "br" || t === "hr" || t === "img") ? "" : `</${t}>`;
    return cleanTag(t, attrs || "");
  });
  // схлопнуть пустые абзацы
  s = s.replace(/<p>(?:\s|&nbsp;|<br>)*<\/p>/gi, "");
  return s.trim();
}

function plainText(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function safeName(id, i, ext) {
  const base = String(id).toLowerCase().replace(/[^a-z0-9-]+/g, "-").slice(0, 80);
  return `${base}-${i}.${ext}`;
}

const pool = await mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "hkoop",
  password: process.env.DB_PASS || "HkoopLocal2026!",
  database: process.env.DB_NAME || "hkoop",
});

try {
  await pool.query("ALTER TABLE news ADD COLUMN IF NOT EXISTS body MEDIUMTEXT NULL");
} catch (e) {
  console.log("Нет прав на ALTER (нужен root). Продолжаю без миграции:", String(e.message || e).slice(0, 100));
}

let rows;
if (ONLY) {
  [rows] = await pool.query("SELECT id, old_url FROM news WHERE id=?", [ONLY]);
} else if (FORCE) {
  [rows] = await pool.query("SELECT id, old_url FROM news WHERE old_url IS NOT NULL AND old_url<>'' ORDER BY id");
} else {
  [rows] = await pool.query("SELECT id, old_url FROM news WHERE body IS NULL AND old_url IS NOT NULL AND old_url<>'' ORDER BY id");
}
if (LIMIT > 0) rows = rows.slice(0, LIMIT);
console.log(`к парсингу: ${rows.length}`);

if (!DRY) {
  fs.mkdirSync(IMG_DIR, { recursive: true });
  fs.mkdirSync(DOC_DIR, { recursive: true });
}

const report = [];
let ok = 0, empty = 0, fail = 0;

for (const [n, r] of rows.map((r, i) => [i, r])) {
  const url = BASE + r.old_url;
  try {
    const html = await fetchText(url);
    const raw = extractArticleBody(html);
    if (!raw) { fail++; report.push({ id: r.id, status: "no-body-tag" }); continue; }
    let body = cleanBody(raw);
    const textLen = plainText(body).length;
    let imgs = 0, docs = 0;
    if (!DRY) {
      // картинки
      const srcs = [...new Set([...body.matchAll(/<img[^>]+src="([^"]+)"/gi)].map((m) => m[1]))];
      for (const src of srcs) {
        const ext = (src.split("?")[0].split(".").pop() || "").toLowerCase();
        if (!IMG_EXT.has(ext)) continue;
        const bin = await fetchBin(src);
        if (!bin) continue;
        const name = safeName(r.id, imgs, ext === "jpeg" ? "jpg" : ext);
        fs.writeFileSync(path.join(IMG_DIR, name), bin.buf);
        body = body.split(`src="${src}"`).join(`src="/images/old/${name}"`);
        imgs++;
        await sleep(200);
      }
      // файлы-приложения
      const hrefs = [...new Set([...body.matchAll(/<a[^>]+href="([^"]+)"/gi)].map((m) => m[1]))];
      for (const href of hrefs) {
        const ext = (href.split("?")[0].split(".").pop() || "").toLowerCase();
        if (!DOC_EXT.has(ext)) continue;
        const bin = await fetchBin(href);
        if (!bin) continue;
        const name = safeName(r.id, `f${docs}`, ext);
        fs.writeFileSync(path.join(DOC_DIR, name), bin.buf);
        body = body.split(`href="${href}"`).join(`href="/docs/old/${name}"`);
        docs++;
        await sleep(200);
      }
      await pool.query("UPDATE news SET body=? WHERE id=?", [body, r.id]);
    }
    if (textLen < 100 && imgs === 0) { empty++; report.push({ id: r.id, status: "short", chars: textLen }); }
    else { ok++; report.push({ id: r.id, status: "ok", chars: textLen, imgs, docs }); }
    if ((n + 1) % 20 === 0) console.log(`  ${n + 1}/${rows.length} ok=${ok} short=${empty} fail=${fail}`);
    await sleep(400);
  } catch (e) {
    fail++;
    report.push({ id: r.id, status: "error", error: String(e.message || e).slice(0, 120) });
  }
}

console.log(`ИТОГ: ok=${ok} short=${empty} fail=${fail} из ${rows.length}${DRY ? " (dry-run, без записи)" : ""}`);
if (!DRY) fs.writeFileSync(path.join(__dirname, "parse-report.json"), JSON.stringify(report, null, 1));
await pool.end();
