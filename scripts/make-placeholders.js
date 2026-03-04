const { chromium } = require('playwright');

const placeholders = [
  { name: 'restaurant', label: 'Restaurant', color: '#0f1a12' },
  { name: 'child-care', label: 'Child Care', color: '#0f1220' },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  for (const p of placeholders) {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head><style>
        body { margin: 0; background: ${p.color}; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
        div { text-align: center; color: rgba(255,255,255,0.15); }
        h1 { font-size: 4rem; font-weight: 800; letter-spacing: -0.03em; }
        p { font-size: 1rem; margin-top: 0.5rem; }
      </style></head>
      <body><div><h1>${p.label}</h1><p>Coming Soon</p></div></body>
      </html>
    `);
    await page.screenshot({
      path: `C:/Users/eabra/WebstormProjects/WebTemplate/assets/screenshots/${p.name}.png`,
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    console.log(`Created placeholder: ${p.name}.png`);
  }

  await browser.close();
})();
