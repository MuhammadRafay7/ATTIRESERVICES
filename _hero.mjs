import { chromium } from "playwright";
const SD = process.argv[2];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 860 } });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await p.waitForTimeout(1800);
await p.screenshot({ path: `${SD}/hero-desktop.png` });         // viewport only
await p.goto("http://localhost:3000/manufacturing", { waitUntil: "networkidle" });
await p.waitForTimeout(1800);
await p.screenshot({ path: `${SD}/mfg-top.png` });
await b.close();
console.log("ok");
