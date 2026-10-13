/**
 * Локальная админка для пресс-службы (только localhost, на GitHub Pages её нет).
 *
 * Запуск:  npm run admin   →  http://127.0.0.1:3101
 * Пароль:  ADMIN_PASS в .env.local (генерируется при первом запуске).
 *
 * Умеет: вход, список новостей (поиск), создание/правка/удаление,
 * загрузка картинок, перегенерация поискового индекса.
 * После правок — пересобрать прод командой «обнови сайт».
 */
import http from "http";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { execFile } from "child_process";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.join(__dirname, "..", "..");
const ADMIN_DIR = __dirname;
const PORT = Number(process.env.ADMIN_PORT || 3101);

// ---- пароль ----
const ENV_PATH = path.join(SITE_ROOT, ".env.local");
function getEnv(name) {
  const m = fs.existsSync(ENV_PATH) ? fs.readFileSync(ENV_PATH, "utf8").match(new RegExp(`^${name}=(.*)$`, "m")) : null;
  return m ? m[1].trim() : process.env[name] || "";
}
let ADMIN_PASS = getEnv("ADMIN_PASS");
if (!ADMIN_PASS) {
  ADMIN_PASS = crypto.randomBytes(12).toString("hex");
  fs.appendFileSync(ENV_PATH, `\nADMIN_PASS=${ADMIN_PASS}\n`);
  console.log("Сгенерирован пароль админки (записан в .env.local):", ADMIN_PASS);
}
const DB = {
  host: getEnv("ADMIN_DB_HOST") || getEnv("DB_HOST") || "127.0.0.1",
  port: Number(getEnv("ADMIN_DB_PORT") || getEnv("DB_PORT") || 3306),
  user: getEnv("ADMIN_DB_USER") || getEnv("DB_USER") || "hkoop",
  password: getEnv("ADMIN_DB_PASS") || getEnv("DB_PASS") || "",
  database: getEnv("ADMIN_DB_NAME") || getEnv("DB_NAME") || "hkoop",
};

const sessions = new Map(); // token -> expires
const json = (res, code, obj) => {
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(obj));
};
const readBody = (req, max = 8 * 1024 * 1024) => new Promise((res, rej) => {
  let n = 0;
  const chunks = [];
  req.on("data", (c) => { n += c.length; if (n > max) { rej(new Error("too big")); req.destroy(); } else chunks.push(c); });
  req.on("end", () => res(Buffer.concat(chunks).toString("utf8")));
  req.on("error", rej);
});
const cookies = (req) => Object.fromEntries((req.headers.cookie || "").split(";").map((s) => s.trim().split("=").map(decodeURIComponent)).filter((a) => a[0]));
const authed = (req) => {
  const t = cookies(req).hkoop_admin;
  const exp = t && sessions.get(t);
  if (!exp || exp < Date.now()) { if (t) sessions.delete(t); return false; }
  return true;
};
const needAuth = (req, res) => {
  const host = (req.headers.host || "").split(":")[0];
  if (!["127.0.0.1", "localhost", "::1"].includes(host)) { json(res, 403, { error: "только локально" }); return false; }
  const origin = req.headers.origin;
  if (origin && !origin.startsWith("http://127.0.0.1") && !origin.startsWith("http://localhost")) { json(res, 403, { error: "bad origin" }); return false; }
  if (!authed(req)) { json(res, 401, { error: "войдите" }); return false; }
  return true;
};

const TR = { а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "i", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "shch", ы: "y", э: "e", ю: "yu", я: "ya", "ь": "", "ъ": "" };
const slugify = (s) => (s || "").toLowerCase().split("").map((c) => TR[c] ?? (/[a-z0-9]/.test(c) ? c : "-")).join("").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 70) || "novost";

// Только http(s)-ссылки и локальные файлы — как safeHref на сайте
function safeHrefCheck(v) {
  const s = String(v || "").trim();
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s.slice(0, 500);
  if (/^\/[a-z0-9._/\-()%]*$/i.test(s)) return s.slice(0, 500);
  return "";
}

const pool = mysql.createPool({ ...DB, waitForConnections: true, connectionLimit: 4 });

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, "http://x");
  try {
    // статика админки
    if (req.method === "GET" && (u.pathname === "/" || u.pathname === "/admin.html")) {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
      res.end(fs.readFileSync(path.join(ADMIN_DIR, "public", "admin.html"), "utf8"));
      return;
    }
    if (req.method === "GET" && u.pathname === "/site-logo") {
      const p = path.join(SITE_ROOT, "public", "images", "logo.png");
      res.writeHead(200, { "Content-Type": "image/png" });
      res.end(fs.readFileSync(p));
      return;
    }
    if (req.method === "GET" && u.pathname === "/api/files") {
      const dir = u.pathname === "/api/files" ? (u.searchParams.get("dir") === "docs" ? "docs" : "images") : "";
      const list = [];
      for (const f of fs.readdirSync(path.join(SITE_ROOT, "public", dir), { withFileTypes: true })) {
        if (f.isFile() && (dir === "docs" ? /\.pdf$/i.test(f.name) : /\.(png|jpe?g|gif|webp|svg)$/i.test(f.name))) list.push(`/${dir}/${f.name}`);
      }
      json(res, 200, { files: list.slice(0, 400) });
      return;
    }
    if (req.method === "POST" && u.pathname === "/api/login") {
      const { password } = JSON.parse(await readBody(req, 1024));
      if (password && password === ADMIN_PASS) {
        const t = crypto.randomBytes(24).toString("hex");
        sessions.set(t, Date.now() + 12 * 3600 * 1000);
        res.writeHead(200, { "Content-Type": "application/json", "Set-Cookie": `hkoop_admin=${t}; HttpOnly; Path=/; SameSite=Strict; Max-Age=43200` });
        res.end(JSON.stringify({ ok: true }));
      } else { await new Promise((r) => setTimeout(r, 800)); json(res, 403, { error: "неверный пароль" }); }
      return;
    }
    if (req.method === "POST" && u.pathname === "/api/logout") {
      sessions.delete(cookies(req).hkoop_admin);
      res.writeHead(200, { "Set-Cookie": "hkoop_admin=; HttpOnly; Path=/; Max-Age=0", "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true }));
      return;
    }
    if (!needAuth(req, res)) return;

    if (req.method === "GET" && u.pathname === "/api/news") {
      const q = (u.searchParams.get("q") || "").slice(0, 100);
      const like = `%${q}%`;
      const [rows] = await pool.query(
        "SELECT id, title, DATE_FORMAT(date,'%Y-%m-%d') AS date, category FROM news WHERE title LIKE ? OR id LIKE ? ORDER BY date DESC LIMIT 200",
        [like, like]
      );
      json(res, 200, { rows });
      return;
    }
    if (req.method === "GET" && u.pathname === "/api/news/one") {
      const [rows] = await pool.query("SELECT id, title, DATE_FORMAT(date,'%Y-%m-%d') AS date, category, tags, excerpt, old_url, image, body FROM news WHERE id=?", [u.searchParams.get("id")]);
      json(res, 200, { row: rows[0] || null });
      return;
    }
    if (req.method === "POST" && u.pathname === "/api/news/save") {
      const b = JSON.parse(await readBody(req));
      if (!b.title || !b.date) { json(res, 400, { error: "нужны заголовок и дата" }); return; }
      let id = (b.id || "").slice(0, 128) || slugify(b.title);
      const tags = Array.isArray(b.tags) ? JSON.stringify(b.tags) : JSON.stringify(String(b.tags || "").split(",").map((s) => s.trim()).filter(Boolean));
      if (b.isNew) {
        const base = slugify(b.title);
        id = base;
        for (let k = 2; k < 100; k++) {
          const [ex] = await pool.query("SELECT id FROM news WHERE id=?", [id]);
          if (ex.length === 0) break;
          id = `${base}-${k}`;
        }
        await pool.query("INSERT INTO news (id,title,date,category,tags,excerpt,old_url,image,body) VALUES (?,?,?,?,?,?,?,?,?)",
          [id, b.title, b.date, b.category || "novosti", tags, b.excerpt || "", b.old_url || "", b.image || "", b.body || null]);
      } else {
        await pool.query("UPDATE news SET title=?,date=?,category=?,tags=?,excerpt=?,old_url=?,image=?,body=? WHERE id=?",
          [b.title, b.date, b.category || "novosti", tags, b.excerpt || "", b.old_url || "", b.image || "", b.body || null, id]);
      }
      regenIndex();
      json(res, 200, { ok: true, id });
      return;
    }
    if (req.method === "POST" && u.pathname === "/api/news/del") {
      const { id } = JSON.parse(await readBody(req, 1024));
      if (!id) { json(res, 400, { error: "нет id" }); return; }
      await pool.query("DELETE FROM news WHERE id=?", [id]);
      regenIndex();
      json(res, 200, { ok: true });
      return;
    }
    // ---- документы ----
    if (req.method === "GET" && u.pathname === "/api/docs") {
      const [rows] = await pool.query("SELECT id,title,type,year,file_old,file_local FROM documents ORDER BY year DESC, id LIMIT 300");
      json(res, 200, { rows });
      return;
    }
    if (req.method === "GET" && u.pathname === "/api/docs/one") {
      const [rows] = await pool.query("SELECT id,title,type,year,file_old,file_local,old_url FROM documents WHERE id=?", [u.searchParams.get("id")]);
      json(res, 200, { row: rows[0] || null });
      return;
    }
    if (req.method === "POST" && u.pathname === "/api/docs/save") {
      const b = JSON.parse(await readBody(req));
      if (!b.title || !b.type || !b.year) { json(res, 400, { error: "нужны заголовок, тип и год" }); return; }
      const type = String(b.type || "document").slice(0, 64);
      const year = Number(b.year) || new Date().getFullYear();
      if (b.isNew) {
        const base = slugify(b.title);
        let id = base;
        for (let k = 2; k < 100; k++) {
          const [ex] = await pool.query("SELECT id FROM documents WHERE id=?", [id]);
          if (ex.length === 0) break;
          id = `${base}-${k}`;
        }
        await pool.query("INSERT INTO documents (id,title,type,year,file_old,file_local,old_url) VALUES (?,?,?,?,?,?,?)",
          [id, b.title, type, year, b.file_old || null, b.file_local || null, b.old_url || null]);
      } else {
        await pool.query("UPDATE documents SET title=?,type=?,year=?,file_old=?,file_local=?,old_url=? WHERE id=?",
          [b.title, type, year, b.file_old || null, b.file_local || null, b.old_url || null, b.id]);
      }
      regenIndex();
      json(res, 200, { ok: true });
      return;
    }
    if (req.method === "POST" && u.pathname === "/api/docs/del") {
      const { id } = JSON.parse(await readBody(req, 1024));
      if (!id) { json(res, 400, { error: "нет id" }); return; }
      await pool.query("DELETE FROM documents WHERE id=?", [id]);
      regenIndex();
      json(res, 200, { ok: true });
      return;
    }

    // ---- мероприятия ----
    if (req.method === "GET" && u.pathname === "/api/events/one") {
      const [rows] = await pool.query("SELECT id,title,DATE_FORMAT(date,'%Y-%m-%d') AS date,type,old_url FROM events WHERE id=?", [u.searchParams.get("id")]);
      json(res, 200, { row: rows[0] || null });
      return;
    }
    if (req.method === "GET" && u.pathname === "/api/events") {
      const [rows] = await pool.query("SELECT id,title,DATE_FORMAT(date,'%Y-%m-%d') AS date,type,old_url FROM events ORDER BY date DESC LIMIT 200");
      json(res, 200, { rows });
      return;
    }
    if (req.method === "POST" && u.pathname === "/api/events/save") {
      const b = JSON.parse(await readBody(req));
      if (!b.title || !b.date) { json(res, 400, { error: "нужны заголовок и дата" }); return; }
      const type = String(b.type || "document").slice(0, 64);
      if (b.isNew) {
        const base = slugify(b.title);
        let id = base;
        for (let k = 2; k < 100; k++) {
          const [ex] = await pool.query("SELECT id FROM events WHERE id=?", [id]);
          if (ex.length === 0) break;
          id = `${base}-${k}`;
        }
        await pool.query("INSERT INTO events (id,title,date,type,old_url) VALUES (?,?,?,?,?)",
          [id, b.title, b.date, type, b.old_url || null]);
      } else {
        await pool.query("UPDATE events SET title=?,date=?,type=?,old_url=? WHERE id=?",
          [b.title, b.date, type, b.old_url || null, b.id]);
      }
      regenIndex();
      json(res, 200, { ok: true });
      return;
    }
    if (req.method === "POST" && u.pathname === "/api/events/del") {
      const { id } = JSON.parse(await readBody(req, 1024));
      if (!id) { json(res, 400, { error: "нет id" }); return; }
      await pool.query("DELETE FROM events WHERE id=?", [id]);
      regenIndex();
      json(res, 200, { ok: true });
      return;
    }

    // ---- партнёры ----
    if (req.method === "GET" && u.pathname === "/api/partners") {
      const [rows] = await pool.query("SELECT id,name,url,logo FROM partners ORDER BY id LIMIT 100");
      json(res, 200, { rows });
      return;
    }
    if (req.method === "POST" && u.pathname === "/api/partners/save") {
      const b = JSON.parse(await readBody(req));
      if (!b.name || !b.url || !b.id) { json(res, 400, { error: "нужны id, название и ссылка" }); return; }
      await pool.query("UPDATE partners SET name=?,url=?,logo=? WHERE id=?",
        [String(b.name).slice(0, 255), safeHrefCheck(b.url), safeHrefCheck(b.logo || ""), b.id]);
      regenIndex();
      json(res, 200, { ok: true });
      return;
    }

    // ---- настройки ----
    if (req.method === "GET" && u.pathname === "/api/settings") {
      const [rows] = await pool.query("SELECT `key`, value FROM site_settings LIMIT 50");
      json(res, 200, { rows });
      return;
    }
    if (req.method === "POST" && u.pathname === "/api/settings/save") {
      const b = JSON.parse(await readBody(req, 4096));
      const pairs = Object.entries(b || {}).filter(([k]) => String(k).slice(0, 128).length);
      for (const [k, v] of pairs) {
        await pool.query("UPDATE site_settings SET value=? WHERE `key`=?", [String(v ?? "").slice(0, 2000), String(k).slice(0, 128)]);
      }
      regenIndex();
      json(res, 200, { ok: true, updated: pairs.length });
      return;
    }

    // ---- сводка для дашборда ----
    if (req.method === "GET" && u.pathname === "/api/stats") {
      const [[cntN]] = await pool.query("SELECT COUNT(*) c FROM news");
      const [[cntD]] = await pool.query("SELECT COUNT(*) c FROM documents");
      const [[cntE]] = await pool.query("SELECT COUNT(*) c FROM events");
      const [[cntP]] = await pool.query("SELECT COUNT(*) c FROM partners");
      const [recent] = await pool.query("SELECT id,title,DATE_FORMAT(date,'%Y-%m-%d') AS date FROM news ORDER BY date DESC LIMIT 5");
      const [[lastEdit]] = await pool.query("SELECT DATE_FORMAT(MAX(date),'%Y-%m-%d %H:%i') AS t FROM news");
      json(res, 200, { news: cntN.c, docs: cntD.c, events: cntE.c, partners: cntP.c, recent, lastEdit: lastEdit.t });
      return;
    }

    if (req.method === "GET" && u.pathname === "/api/images") {
      const dir = path.join(SITE_ROOT, "public", "images");
      const files = [];
      for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
        if (f.isFile() && /\.(png|jpe?g|gif|webp|svg)$/i.test(f.name)) files.push(`/images/${f.name}`);
      }
      json(res, 200, { files: files.slice(0, 300) });
      return;
    }
    if (req.method === "POST" && u.pathname === "/api/upload") {
      const { name, data, kind } = JSON.parse(await readBody(req, 22 * 1024 * 1024));
      const safe = path.basename(String(name || "")).toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^(-|\.)+/, "");
      const isDoc = kind === "doc";
      if (!isDoc && !/\.(png|jpe?g|gif|webp|svg)$/i.test(safe)) { json(res, 400, { error: "только картинки" }); return; }
      if (isDoc && !/\.pdf$/i.test(safe)) { json(res, 400, { error: "только PDF" }); return; }
      const buf = Buffer.from(String(data || "").split(",").pop(), "base64");
      const max = isDoc ? 15 : 5;
      if (buf.length === 0 || buf.length > max * 1024 * 1024) { json(res, 400, { error: `пусто или >${max} МБ` }); return; }
      const stamp = Date.now().toString(36);
      const fname = `${stamp}-${safe}`.slice(0, 100);
      fs.writeFileSync(path.join(SITE_ROOT, "public", isDoc ? "docs" : "images", fname), buf);
      json(res, 200, { ok: true, url: isDoc ? `/docs/${fname}` : `/images/${fname}` });
      return;
    }
    json(res, 404, { error: "нет такого" });
  } catch (e) {
    console.error(e.message);
    json(res, 500, { error: "ошибка сервера" });
  }
});

let regenT = null;
function regenIndex() {
  clearTimeout(regenT);
  regenT = setTimeout(() => {
    execFile("node", ["scripts/gen-search-index.mjs"], { cwd: SITE_ROOT }, (e) => e && console.error("index:", e.message));
  }, 2000);
}

server.listen(PORT, "127.0.0.1", () => console.log(`Админка: http://127.0.0.1:${PORT}`));
