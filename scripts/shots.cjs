const { chromium } = require('playwright-core');
const fs = require('fs');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const OUT = 'shots';

async function settle(page, ms = 1000) {
  await page.waitForTimeout(ms);
}

async function goto(page, selector, offset = 76) {
  await page.evaluate(
    ([sel, off]) => {
      const el = document.querySelector(sel);
      const top = el.getBoundingClientRect().top + window.scrollY - off;
      window.scrollTo({ top, behavior: 'instant' });
    },
    [selector, offset],
  );
  await settle(page);
}

async function shot(page, name) {
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log('shot', name);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
  });
  await settle(page, 3200);
  await shot(page, '01-hero-desktop');

  const flip = page.locator('.portrait-flip');
  const flipBox = await flip.boundingBox();
  const cy = flipBox.y + flipBox.height / 2;
  await page.mouse.move(flipBox.x + flipBox.width / 2, cy);
  await page.mouse.down();
  for (let i = 1; i <= 8; i++) {
    await page.mouse.move(flipBox.x + flipBox.width / 2 + i * 14, cy);
    await settle(page, 30);
  }
  await shot(page, '16-portrait-mid-flip');
  await page.mouse.up();
  await settle(page, 900);
  if ((await page.locator('.portrait-flip').getAttribute('aria-pressed')) !== 'true') {
    await page.locator('.portrait-flip').click();
    await settle(page, 1000);
  }
  await page.locator('.portrait-face--back').screenshot({ path: 'shots/17-portrait-back.png' });
  console.log('shot 17-portrait-back');
  await page.locator('.portrait-flip').click();
  await settle(page, 900);

  await goto(page, '#profile');
  await shot(page, '02-profile');

  await goto(page, '#work');
  await shot(page, '03-work');

  await page.locator('.pc-open').first().click();
  await settle(page, 600);
  await shot(page, '04-case-study');
  await page.keyboard.press('Escape');
  await settle(page, 400);

  await goto(page, '#lab', 60);
  await shot(page, '05-lab');

  await page.locator('#lab-query').fill('What has he built with computer vision?');
  await page.locator('.lab-submit').click();
  await settle(page, 1600);
  await page.evaluate(() => {
    const panel = document.querySelector('.lab-panel');
    window.scrollTo({ top: panel.getBoundingClientRect().top + window.scrollY - 90, behavior: 'instant' });
  });
  await settle(page, 500);
  await shot(page, '06-lab-results');

  await goto(page, '#stack');
  await shot(page, '07-stack');

  await goto(page, '#journey');
  await shot(page, '08-journey');

  await goto(page, '#credentials');
  await shot(page, '09-credentials');

  await goto(page, '#github');
  await settle(page, 1200);
  await shot(page, '10-github');

  await goto(page, '#contact');
  await shot(page, '11-contact');

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await settle(page, 600);
  await page.locator('.kbd-btn').click();
  await settle(page, 500);
  await shot(page, '12-palette');
  await page.keyboard.press('Escape');
  await settle(page, 400);

  await page.locator('.nav-right .icon-btn').first().click();
  await settle(page, 900);
  await shot(page, '13-hero-light');
  await goto(page, '#work');
  await shot(page, '14-work-light');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await settle(page, 400);
  await page.locator('.nav-right .icon-btn').first().click();
  await settle(page, 600);

  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  });
  await mobile.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await mobile.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
  });
  await settle(mobile, 3000);
  await shot(mobile, '20-mobile-hero');

  await goto(mobile, '#work');
  await shot(mobile, '21-mobile-work');

  await goto(mobile, '#lab', 60);
  await settle(mobile, 600);
  await shot(mobile, '22-mobile-lab');

  await goto(mobile, '#contact');
  await shot(mobile, '23-mobile-contact');

  await mobile.locator('.nav-toggle').click();
  await settle(mobile, 600);
  await shot(mobile, '24-mobile-menu');

  console.log('CONSOLE ERRORS:', errors.length ? errors : 'none');
  await browser.close();
})();
