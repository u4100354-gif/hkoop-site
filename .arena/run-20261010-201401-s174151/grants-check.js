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
  const [rows] = await c.query('SHOW GRANTS');
  rows.forEach((r) => {
    let v = Object.values(r)[0];
    v = v.replace(/IDENTIFIED BY.*/i, "IDENTIFIED BY PASSWORD '***'");
    console.log('GRANT-ROW: ' + v);
  });
  const [c2] = await c.query('SELECT CURRENT_USER() AS u');
  console.log('CURRENT: ' + JSON.stringify(c2));
  await c.end();
})().catch((e) => { console.log('ERR ' + e.code + ' ' + String(e.message).split('\n')[0]); });
