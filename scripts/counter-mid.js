const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await c.newPage();
  await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
  await p.evaluate(() => document.querySelector(".stats-band").scrollIntoView({ block: "center" }));
  await p.waitForTimeout(500);
  const mid = await p.evaluate(() => Array.from(document.querySelectorAll(".stats b")).map((e) => e.textContent));
  console.log("MID-ANIMATION:", JSON.stringify(mid));
  await b.close();
})();
