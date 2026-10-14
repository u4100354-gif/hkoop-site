const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const c = await b.newContext({ viewport: { width: 390, height: 900 } });
  const p = await c.newPage();
  await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
  await p.waitForTimeout(800);
  const fixed = await p.evaluate(() => Array.from(document.querySelectorAll("body *"))
    .filter((e) => getComputedStyle(e).position === "fixed")
    .map((e) => e.tagName + "." + (e.className.baseVal !== undefined ? "[svg]" : String(e.className).split(" ").slice(0,2).join(".")) + " :: " + (e.textContent||"").trim().slice(0,40)));
  console.log("FIXED:", JSON.stringify(fixed));
  await p.evaluate(() => document.querySelector(".footer").scrollIntoView());
  await p.waitForTimeout(500);
  await p.screenshot({ path: "/tmp/audit/mob-footer.png" });
  await b.close();
})();
