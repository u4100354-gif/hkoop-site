const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await c.newPage();
  p.on("pageerror", (e) => console.log("PAGEERROR:", e.message.slice(0, 200)));
  await p.goto("http://localhost:3100/about/", { waitUntil: "networkidle" });
  await p.evaluate(() => {
    localStorage.setItem("hkoop-vi", "1");
    localStorage.setItem("hkoop-vi-scheme", "wb");
  });
  await p.reload({ waitUntil: "networkidle" });
  await p.waitForTimeout(1500);
  console.log("BODY:", await p.evaluate(() => document.body.className));
  console.log("LS:", await p.evaluate(() => localStorage.getItem("hkoop-vi") + "/" + localStorage.getItem("hkoop-vi-scheme")));
  console.log("PANEL:", await p.evaluate(() => !!document.querySelector(".vi-panel")));
  await b.close();
})();
