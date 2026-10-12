const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const c = await b.newContext({ viewport: { width: 390, height: 900 } });
  const p = await c.newPage();
  await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
  await p.waitForTimeout(800);
  const m = await p.evaluate(() => {
    const form = document.querySelector(".consult-band .consult-form");
    const card = document.querySelector(".consult-band .card");
    const inp = document.querySelector(".consult-band input[name=name]");
    const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: Math.round(b.x), w: Math.round(b.width) }; };
    return { form: r(form), card: r(card), inp: r(inp), innerW: window.innerWidth,
      formCS: form && { mw: getComputedStyle(form).maxWidth, disp: getComputedStyle(form).display } };
  });
  console.log(JSON.stringify(m, null, 1));
  await b.close();
})();
