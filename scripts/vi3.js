const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await c.newPage();
  const warns = [];
  p.on("console", (m) => { if (["error","warning"].includes(m.type())) warns.push(m.type() + ": " + m.text().slice(0, 160)); });
  p.on("pageerror", (e) => console.log("PAGEERROR:", e.message.slice(0, 300)));
  await p.goto("http://localhost:3100/about/", { waitUntil: "networkidle" });
  await p.waitForTimeout(1500);
  console.log("toggleVi:", await p.evaluate(() => typeof window.toggleVi));
  console.log("react-root:", await p.evaluate(() => !!document.querySelector("[data-nextjs-scroll-focus-boundary]") || document.body.innerHTML.length));
  console.log("WARN/ERR:", JSON.stringify(warns.slice(0, 6), null, 1));
  await b.close();
})();
