const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const c = await b.newContext({ viewport: { width: 390, height: 900 } });
  const p = await c.newPage();
  await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
  await p.waitForTimeout(800);
  await p.evaluate(() => { localStorage.setItem("hkoop-cookie", "1"); });
  await p.reload({ waitUntil: "networkidle" });
  await p.waitForTimeout(800);
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await p.waitForTimeout(600);
  await p.screenshot({ path: "/tmp/audit/mob-footer2.png" });
  await b.close();
})();
