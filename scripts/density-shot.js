// Скрины сцен после правок плотности/выравнивания: 390 / 768 / 1440
const { chromium } = require("playwright");
const fs = require("fs");

const OUT = "/private/var/folders/9x/lqbbf3rd6cs7ztf8qv__pb9c0000gn/T/opencode/shots";
const BASE = "http://localhost:3100";
const WIDTHS = [390, 768, 1440];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch();
  for (const w of WIDTHS) {
    const c = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : w === 768 ? 1024 : 900 } });
    const p = await c.newPage();
    await p.goto(BASE + "/", { waitUntil: "load" });
    await p.evaluate(() => { localStorage.setItem("hkoop-cookie", "1"); });
    await p.reload({ waitUntil: "load" });
    await p.waitForTimeout(900);

    // сцена чисел (+сноска): дождаться досчитывания счётчиков (2.2s)
    await p.evaluate(() => document.querySelector("#cifry").scrollIntoView());
    await p.waitForTimeout(3000);
    await p.locator("#cifry").screenshot({ path: `${OUT}/home-cifry-${w}.png` });

    // партнёры — все 13
    await p.evaluate(() => document.querySelector("#links").scrollIntoView());
    await p.waitForTimeout(1800);
    await p.locator("#links").screenshot({ path: `${OUT}/home-links-${w}.png` });

    // подвал без «Локальный прототип»
    await p.evaluate(() => document.querySelector("footer").scrollIntoView());
    await p.waitForTimeout(800);
    await p.locator("footer").screenshot({ path: `${OUT}/home-footer-${w}.png` });

    if (w === 1440) {
      // вся главная одним кадром — общая плотность
      await p.evaluate(() => window.scrollTo(0, 0));
      await p.waitForTimeout(1200);
      await p.screenshot({ path: `${OUT}/home-full-${w}.png`, fullPage: true });

      // «О нас» — абзацы теперь влево
      await p.goto(BASE + "/about", { waitUntil: "load" });
      await p.waitForTimeout(1200);
      await p.locator("#intro").screenshot({ path: `${OUT}/about-intro-${w}.png` });
    }
    await c.close();
  }
  await b.close();
  console.log("OK →", OUT);
})().catch((e) => { console.error(e); process.exit(1); });
