const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await c.newPage();
  p.on("response", (r) => { if (r.status() >= 400) console.log(r.status(), r.url().slice(0, 120)); });
  await p.goto("http://localhost:3100/about/", { waitUntil: "networkidle" });
  await p.waitForTimeout(1500);
  await b.close();
})();
