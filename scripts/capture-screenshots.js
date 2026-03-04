const { chromium } = require('playwright');
const path = require('path');

const templates = [
  { name: 'ai-website',      file: 'AI website/index.html' },
  { name: 'futuristic',      file: 'Futuristic/index.html' },
  { name: 'travel',          file: 'Travel/index.html' },
  { name: 'bakery',          file: 'bakery/index.html' },
  { name: 'betterbakery',    file: 'betterbakery/index.html' },
  { name: 'fast-food-pro',   file: 'fast_food_pro/index.html' },
  { name: 'lawyer',          file: 'lawyer/index.html' },
  { name: 'modern-clothing', file: 'modern_clothing/index.html' },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  for (const t of templates) {
    const absPath = path.resolve('C:/Users/eabra/WebstormProjects', t.file);
    const fileUrl = 'file:///' + absPath.replace(/\\/g, '/');
    console.log(`Capturing: ${t.name} from ${fileUrl}`);
    try {
      await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: `C:/Users/eabra/WebstormProjects/WebTemplate/assets/screenshots/${t.name}.png`,
        clip: { x: 0, y: 0, width: 1440, height: 900 }
      });
      console.log(`  ✓ Saved ${t.name}.png`);
    } catch (e) {
      console.log(`  ✗ Failed ${t.name}: ${e.message}`);
    }
  }

  await browser.close();
  console.log('Done!');
})();
