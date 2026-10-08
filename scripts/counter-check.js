const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await c.newPage();
  await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
  // сразу: числа видны, не нули
  const at0 = await p.evaluate(() => Array.from(document.querySelectorAll(".stats b")).map((e) => e.textContent));
  await p.evaluate(() => document.querySelector(".stats-band").scrollIntoView({ block: "center" }));
  await p.waitForTimeout(1800);
  const atEnd = await p.evaluate(() => Array.from(document.querySelectorAll(".stats b")).map((e) => e.textContent));
  console.log("AT0:", JSON.stringify(at0));
  console.log("END:", JSON.stringify(atEnd));
  await b.close();
})();
