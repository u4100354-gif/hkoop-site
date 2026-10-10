// SELECT-only DB audit. Secrets read from .env.local, never printed.
const fs = require('fs');
const mysql = require('/app/node_modules/mysql2/promise.js');
(async () => {
  const raw = fs.readFileSync(process.env.HOME + '/x', 'utf8');
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
