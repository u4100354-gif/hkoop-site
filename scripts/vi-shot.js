const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await c.newPage();
  await p.goto("http://localhost:3100/about/", { waitUntil: "networkidle" });
  await p.evaluate(() => {
    localStorage.setItem("hkoop-vi", "1");
    localStorage.setItem("hkoop-vi-scheme", "wb");
  });
  await p.reload({ waitUntil: "networkidle" });
  await p.waitForTimeout(1500);
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await p.waitForTimeout(600);
  await p.screenshot({ path: "/tmp/audit/vi-footer.png" });
  await b.close();
})();
