// Проверка вёрстки после правок: 390 / 768 / 1440
const { chromium } = require("playwright");

const BASE = "http://localhost:3100";
const WIDTHS = [390, 768, 1440];

(async () => {
  const b = await chromium.launch();
  for (const w of WIDTHS) {
    const c = await b.newContext({ viewport: { width: w, height: 900 } });
    const p = await c.newPage();
    await p.goto(BASE + "/", { waitUntil: "load" });
    await p.evaluate(() => { localStorage.setItem("hkoop-cookie", "1"); });
    await p.reload({ waitUntil: "load" });
    await p.waitForTimeout(900);

    const r = await p.evaluate(async () => {
      const out = {};
      // плитки чисел
      const cifry = document.querySelector("#cifry");
      cifry.scrollIntoView();
      await new Promise((r) => setTimeout(r, 2800)); // счётчики досчитали
      out.tiles = document.querySelectorAll("#cifry .act-num-item").length;
      out.tileVals = [...document.querySelectorAll("#cifry .act-num-item b")].map((b) => b.textContent);
      const note = document.querySelector("#cifry .act-note");
      out.noteAlign = note ? getComputedStyle(note).textAlign : "нет";
      out.noteText = note ? note.textContent.slice(0, 40) + "…" : "нет";
      // плитки не вылезают за ряд?
      const numsRect = document.querySelector("#cifry .act-nums").getBoundingClientRect();
      out.numsH = Math.round(numsRect.height);
      // партнёры
      document.querySelector("#links").scrollIntoView();
      await new Promise((r) => setTimeout(r, 1200));
      out.partners = document.querySelectorAll("#links .partner-card").length;
      const grid = document.querySelector("#links .partners-grid");
      const first = grid.querySelector(".partner-card").getBoundingClientRect();
      out.partnerCols = [...grid.querySelectorAll(".partner-card")].reduce((acc, el) => {
        const x = Math.round(el.getBoundingClientRect().x);
        if (!acc.includes(x)) acc.push(x);
        return acc;
      }, []).length;
      out.partnerNames = [...grid.querySelectorAll(".partner-card")].every((el) => el.textContent.trim().length > 3);
      // подвал
      out.footerHasPrototype = document.querySelector("footer").textContent.includes("Локальный прототип");
      // горизонтальный скролл
      out.hScroll = document.scrollingElement.scrollWidth > window.innerWidth;
      // абзацы сцен
      out.textAlign = getComputedStyle(document.querySelector(".act-text") || document.body).textAlign;
      return out;
    });
    console.log(`\n=== ${w}px (главная) ===`);
    console.log(JSON.stringify(r, null, 1));

    if (w === 1440) {
      const about = await p.goto(BASE + "/about", { waitUntil: "load" }).then(() =>
        p.evaluate(() => {
          const t = document.querySelector("#intro .act-text p");
          return { aboutTextAlign: t ? getComputedStyle(t).textAlign : "нет" };
        })
      );
      console.log(`\n=== 1440px (о нас) ===`);
      console.log(JSON.stringify(about, null, 1));
    }
    await c.close();
  }
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
