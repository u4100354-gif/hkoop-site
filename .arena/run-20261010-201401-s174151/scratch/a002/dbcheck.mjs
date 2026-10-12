import fs from "fs";
import mysql from "mysql2/promise";
function loadEnv(p) {
  const out = {};
  for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m || line.trim().startsWith("#")) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    out[m[1]] = v;
  }
  return out;
}
const e = loadEnv(".env.local");
const pool = mysql.createPool({ host: e.DB_HOST||"127.0.0.1", port: Number(e.DB_PORT||3306), user: e.DB_USER||"hkoop", password: e.DB_PASS||"", database: e.DB_NAME||"hkoop", connectionLimit: 2 });
const q = async (sql) => (await pool.query(sql))[0];
const show = (t, rows) => { console.log("== " + t + " (" + rows.length + ")"); for (const r of rows.slice(0, 40)) console.log(JSON.stringify(r).slice(0, 300)); };
show("partners url/logo", await q("SELECT id,url,logo FROM partners"));
show("honor photo", await q("SELECT id,photo FROM honor"));
show("documents files", await q("SELECT id,file_local,file_old FROM documents LIMIT 12"));
show("settings social", await q("SELECT `key`,LEFT(value,120) AS v FROM site_settings"));
show("grants", await q("SELECT CURRENT_USER() AS u"));
try { show("grants2", await q("SHOW GRANTS")); } catch (err) { console.log("SHOW GRANTS err: " + err.message); }
const sus = await q("SELECT 'partners' t, id, url AS v FROM partners WHERE url NOT LIKE 'http%' AND url NOT LIKE '/%' UNION ALL SELECT 'honor', id, photo FROM honor WHERE photo NOT LIKE 'http%' AND photo NOT LIKE '/%' AND photo<>'' UNION ALL SELECT 'documents', id, file_old FROM documents WHERE file_old IS NOT NULL AND file_old NOT LIKE 'http%' AND file_old NOT LIKE '/%'");
show("non-allowlist urls", sus);
await pool.end();
