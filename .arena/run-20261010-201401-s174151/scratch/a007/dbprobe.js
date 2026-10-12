// SELECT-only DB audit. Secrets used, never printed.
const fs = require('fs');
const path = 'C:\\Users\\speed\\OneDrive\\\u0414\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u044b\\\u041f\u0440\u043e\u0435\u043a\u0442 \u043f\u043e \u0443\u043c\u043e\u043b\u0447\u0430\u043d\u0438\u044e\\hkoop-site';
let mod;
try { mod = require(path + '\\node_modules\\mysql2\\promise.js'); }
catch (e) { console.error('MODLOAD_FAIL', e.message.slice(0,200)); process.exit(1); }
(async () => {
  const envText = fs.readFileSync(path + '\\.env.local', 'utf8');
  const env = {};
  for (const line of envText.split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) env[m[1]] = m[2].trim();
  }
  const pool = mod.createPool({ host: env.DB_HOST, port: Number(env.DB_PORT), user: env.DB_USER, password: env.DB_PASS, database: env.DB_NAME });
  const show = async (label, sql) => {
    try {
      const [rows] = await pool.query(sql);
      console.log(label, JSON.stringify(rows).slice(0, 1500));
    } catch (e) { console.log(label, 'ERR', e.message.slice(0, 200)); }
  };
  await show('GRANTS', 'SHOW GRANTS');
  await show('PARTNERS_URL', 'SELECT id,url,logo FROM partners');
  await show('HONOR_PHOTO', 'SELECT id,photo FROM honor');
  await show('DOCS_FILES', 'SELECT id,file_local,file_old FROM documents LIMIT 8');
  await show('SETTINGS', 'SELECT `key`, LEFT(value,80) AS v FROM site_settings');
  await show('XSS_SCAN_PARTNERS', "SELECT id FROM partners WHERE url LIKE 'javascript:%' OR url LIKE 'data:%' OR logo LIKE 'javascript:%' OR logo LIKE 'data:%'");
  await show('XSS_SCAN_HONOR', "SELECT id FROM honor WHERE photo LIKE 'javascript:%' OR photo LIKE 'data:%'");
  await show('XSS_SCAN_DOCS', "SELECT id FROM documents WHERE file_local LIKE 'javascript:%' OR file_old LIKE 'javascript:%' OR file_local LIKE 'data:%' OR file_old LIKE 'data:%'");
  await show('TABLES', "SELECT table_name FROM information_schema.tables WHERE table_schema=DATABASE()");
  await pool.end();
})().catch(e => { console.error('FATAL', String(e.message).replace(/:[^@]*@/, ':***@').slice(0, 300)); process.exit(1); });
