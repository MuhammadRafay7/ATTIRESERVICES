import { chromium } from "playwright";

const routes = [
  ["home", "/"],
  ["manufacturing", "/manufacturing"],
  ["products", "/industries"],
  ["services", "/services"],
  ["about", "/about"],
  ["contact", "/contact"],
];
const out = process.argv[2] || "/tmp/shots";
const base = "http://localhost:3000";

const browser = await chromium.launch();

for (const [w, label] of [[1280, "desktop"], [390, "mobile"]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const [name, route] of routes) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    // let reveals/animations settle
    await page.waitForTimeout(1400);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1200);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${out}/${label}-${name}.png`, fullPage: true });
    console.log(`shot ${label}-${name}`);
  }
  await ctx.close();
}
await browser.close();
console.log("done");
