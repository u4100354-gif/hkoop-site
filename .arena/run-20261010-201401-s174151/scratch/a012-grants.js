const fs = require('fs');
const path = require('path');
const mysql = require(path.join('C:', 'Users', 'speed', 'OneDrive', 'Документы', 'Проект по умолчанию', 'hkoop-site', 'node_modules', 'mysql2', 'promise.js'));
(async () => {
  try {
    const txt = fs.readFileSync(path.join('C:', 'Users', 'speed', 'OneDrive', 'Документы', 'Проект по умолчанию', 'hkoop-site', '.env.local'), 'utf8');
    const env = {};
    txt.split(/\r?\n/).forEach((l) => {
      const m = l.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m) {
        let v = m[2].trim();
        if (v.length >= 2 && ((v[0] === '"' && v[v.length-1] === '"') || (v[0] === "'" && v[v.length-1] === "'"))) v = v.slice(1, -1);
        env[m[1]] = v;
      }
    });
    const c = await mysql.createConnection({ host: env.DB_HOST || '127.0.0.1', port: Number(env.DB_PORT || 3306), user: env.DB_USER || 'hkoop', password: env.DB_PASS || '', database: env.DB_NAME || 'hkoop', connectTimeout: 3000 });
    const g = await c.query('SHOW GRANTS');
    console.log('GRANTS-OK:');
    console.log(JSON.stringify(g[0]).slice(0, 1500));
    await c.end();
  } catch (e) { console.log('GRANTS-FAIL:' + (e.code || '') + ':' + String((e && e.message) || e).slice(0, 200)); }
})();
