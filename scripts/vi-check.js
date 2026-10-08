const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await c.newPage();
  await p.goto("http://localhost:3100/about/", { waitUntil: "networkidle" });
  // включаем VI + схему wb как у пользователя
  await p.evaluate(() => {
    localStorage.setItem("hkoop-vi", "1");
    localStorage.setItem("hkoop-vi-scheme", "wb");
    localStorage.setItem("hkoop-vi-size", "1");
    location.reload();
  });
  await p.waitForTimeout(1500);
  const cls = await p.evaluate(() => document.body.className);
  console.log("BODY:", cls);
  // смотрим стили проблемных мест
  const info = await p.evaluate(() => {
    const out = {};
    const nav = document.querySelector(".mainnav");
    out.navBg = nav && getComputedStyle(nav).backgroundColor;
    const link = document.querySelector(".links a");
    out.linkColor = link && getComputedStyle(link).color;
    out.linkBg = link && getComputedStyle(link).backgroundColor;
    const cols = Array.from(document.querySelectorAll(".footer-grid > div")).map((d) => ({
      bg: getComputedStyle(d).backgroundColor,
      links: Array.from(d.querySelectorAll("a")).slice(0, 3).map((a) => getComputedStyle(a).color + "/" + getComputedStyle(a).backgroundColor),
    }));
    out.cols = cols;
    return out;
  });
  console.log(JSON.stringify(info, null, 1));
  await p.screenshot({ path: "/tmp/audit/vi-wb.png", fullPage: true });
  await b.close();
})();
