const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  let c = await b.newContext({ viewport: { width: 390, height: 820 } });
  let p = await c.newPage();
  await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
  await p.waitForTimeout(1200);
  await p.screenshot({ path: "/tmp/audit/mobile-header.png" });
  await c.close();

  c = await b.newContext({ viewport: { width: 1440, height: 900 } });
  p = await c.newPage();
  await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
  await p.waitForTimeout(1200);
  const stats = await p.evaluate(() => Array.from(document.querySelectorAll(".stats b")).map((e) => e.textContent));
  console.log("STATS:", JSON.stringify(stats));
  const h1s = await p.evaluate(() => Array.from(document.querySelectorAll("h1")).map((e) => e.textContent.slice(0, 40)));
  console.log("H1:", JSON.stringify(h1s));
  await b.close();
})();
