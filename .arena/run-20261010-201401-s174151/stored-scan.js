const fs = require('fs');
const env = {};
const raw = fs.readFileSync('C:/Users/speed/OneDrive/Документы/Проект по умолчанию/hkoop-site/.env.local', 'utf8');
raw.split('\n').forEach((l) => {
  const m = l.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
  if (m) env[m[1]] = m[2].trim();
});
(async () => {
  const mysql = require('mysql2/promise');
  const c = await mysql.createConnection({ host: env.DB_HOST || '127.0.0.1', port: +(env.DB_PORT || 3306), user: env.DB_USER, database: env.DB_NAME, password: env.DB_PASS });
  const tables = ['news', 'documents', 'partners', 'site_settings', 'honor'];
  for (const t of tables) {
    try {
      const [[n]] = await c.query('SELECT COUNT(*) AS c FROM `' + t + '`');
      console.log(t + ' COUNT=' + n.c);
    } catch (e) { console.log(t + ' ERR ' + e.message.split('\n')[0]); }
  }
  const probes = [
    ['documents', 'SELECT id, LEFT(file_local,80) AS s FROM documents WHERE file_local LIKE "%javascript:%" OR file_local LIKE "%data:%" OR file_local LIKE "%//%" LIMIT 5'],
    ['partners-url', 'SELECT id, LEFT(url,80) AS s FROM partners WHERE url LIKE "%javascript:%" OR url LIKE "%data:%" LIMIT 5'],
    ['partners-logo', 'SELECT id, LEFT(logo,80) AS s FROM partners WHERE logo LIKE "%javascript:%" OR logo LIKE "%data:%" OR logo LIKE "%http%" LIMIT 10'],
    ['settings', 'SELECT `key`, LEFT(value,80) AS s FROM site_settings WHERE value LIKE "%javascript:%" OR value LIKE "%data:text%" LIMIT 5'],
    ['honor', 'SELECT id, LEFT(photo,80) AS s FROM honor WHERE photo LIKE "%javascript:%" OR photo LIKE "%data:%" OR photo LIKE "%http%" LIMIT 10'],
  ];
  for (const [name, sql] of probes) {
    try {
      const [rows] = await c.query(sql);
      console.log(name + ' SUSPICIOUS-ROWS=' + rows.length);
      rows.forEach((r) => console.log('  ' + JSON.stringify(r)));
    } catch (e) { console.log(name + ' ERR ' + e.message.split('\n')[0]); }
  }
  await c.end();
})().catch((e) => { console.log('ERR ' + String(e.message).split('\n')[0]); });
