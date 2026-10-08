const { chromium } = require("playwright");
const fs = require("fs");

const BASE = "http://localhost:3100";
const WIDTHS = [390, 768, 1440];
const PAGES = [
  ["home", "/"],
  ["news", "/news/"],
  ["docs", "/docs/"],
  ["honor", "/honor/"],
  ["contacts", "/contacts/"],
];
const OUT = "/tmp/audit";
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const report = [];

  for (const [name, path] of PAGES) {
    for (const w of WIDTHS) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      const errors = [];
      page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
      page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
      try {
        await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 30000 });
      } catch (e) {
        report.push({ name, w, error: "goto: " + e.message });
      }
      await page.waitForTimeout(900);

      const metrics = await page.evaluate(() => {
        const doc = document.documentElement;
        const overflowX = doc.scrollWidth - window.innerWidth;
        // элементы, выходящие за правый край
        const offenders = [];
        document.querySelectorAll("body *").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0 && r.right > window.innerWidth + 2) {
            const cs = getComputedStyle(el);
            if (cs.position === "fixed" || cs.visibility === "hidden") return;
            offenders.push({
              sel: el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.split(" ").filter(Boolean).slice(0, 2).join(".") : ""),
              right: Math.round(r.right),
            });
          }
        });
        // тап-таргеты меньше 40px (интерактив)
        const smallTaps = [];
        document.querySelectorAll("a, button, input, select, textarea").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;
          if (r.height < 40 && el.tagName !== "A" && el.tagName !== "INPUT" && el.tagName !== "SELECT" && el.tagName !== "TEXTAREA") {
            smallTaps.push(el.tagName.toLowerCase() + "." + (el.className || "").split(" ")[0]);
          }
        });
        // картинки без размеров
        const noDims = Array.from(document.images).filter((i) => !i.getAttribute("width") && !i.naturalWidth).length;
        const imgs = document.images.length;
        // пустые изображения (битые)
        const broken = Array.from(document.images).filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src);
        return {
          overflowX,
          offenders: offenders.slice(0, 8),
          smallTaps: Array.from(new Set(smallTaps)).slice(0, 8),
          imgs,
          noDims,
          broken: broken.slice(0, 8),
          title: document.title,
          h1: (document.querySelector("h1") || {}).textContent || "",
        };
      });

      await page.screenshot({ path: `${OUT}/${name}-${w}.png`, fullPage: true });
      report.push({ name, w, ...metrics, errors: errors.slice(0, 5) });
      await ctx.close();
    }
  }

  await browser.close();
  fs.writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 2));
  for (const r of report) {
    const flags = [];
    if (r.overflowX > 1) flags.push(`OVERFLOW_X=${r.overflowX}`);
    if (r.offenders?.length) flags.push(`OFFENDERS=${r.offenders.length}`);
    if (r.broken?.length) flags.push(`BROKEN_IMG=${r.broken.length}`);
    if (r.errors?.length) flags.push(`ERRORS=${r.errors.length}`);
    console.log(`${r.name}@${r.w} :: ${flags.join(" ") || "ok"}`);
    if (r.offenders?.length) r.offenders.forEach((o) => console.log(`    → ${o.sel} right=${o.right}`));
    if (r.broken?.length) r.broken.forEach((b) => console.log(`    ✗ broken img: ${b}`));
    if (r.errors?.length) r.errors.forEach((e) => console.log(`    ! ${e}`));
  }
})();
