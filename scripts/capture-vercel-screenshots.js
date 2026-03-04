const { chromium } = require('playwright');

const sites = [
  { name: 'photography',   url: 'https://photographer-gules.vercel.app/' },
  { name: 'bakery-new',    url: 'https://better-bakery.vercel.app/' },
  { name: 'nail-salon-new',url: 'https://nail-salon-r6oa1705p-lw13377s-projects.vercel.app/' },
  { name: 'real-estate',   url: 'https://real-estate-beta-amber.vercel.app/' },
  { name: 'dentist',       url: 'https://bright-smile-dental-five.vercel.app/' },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  for (const s of sites) {
    console.log(`Capturing: ${s.name} from ${s.url}`);
    try {
      await page.goto(s.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);
      await page.screenshot({
        path: `C:/Users/eabra/WebstormProjects/WebTemplate/assets/screenshots/${s.name}.png`,
        clip: { x: 0, y: 0, width: 1440, height: 900 }
      });
      console.log(`  ✓ ${s.name}.png`);
    } catch (e) {
      console.log(`  ✗ Failed ${s.name}: ${e.message}`);
    }
  }

  await browser.close();
  console.log('Done!');
})();
