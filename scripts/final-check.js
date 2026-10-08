const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  for (const w of [390, 768, 1440]) {
    const c = await b.newContext({ viewport: { width: w, height: 900 } });
    const p = await c.newPage();
    const errs = [];
    p.on("pageerror", (e) => errs.push(e.message.slice(0, 100)));
    await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
    await p.waitForTimeout(1000);
    const cta = await p.evaluate(() => {
      const els = [...document.querySelectorAll(".abtns .btn, .consult-form .btn")];
      return els.map((e) => { const r = e.getBoundingClientRect(); return { t: e.textContent.trim().slice(0, 20), y: Math.round(r.top), h: Math.round(r.height) }; });
    });
    console.log(w, "CTA:", JSON.stringify(cta), "ERR:", errs.length ? errs : "none");
    await p.screenshot({ path: `/tmp/audit/final-${w}.png` });
    await c.close();
  }
  await b.close();
})();
