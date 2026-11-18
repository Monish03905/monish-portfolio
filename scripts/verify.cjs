const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
  await page.waitForTimeout(2800);

  // 1. palette keyboard scrolling
  await page.locator('.kbd-btn').click();
  await page.waitForTimeout(400);
  for (let i = 0; i < 12; i++) await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(300);
  const palette = await page.evaluate(() => {
    const list = document.querySelector('.palette-list');
    const item = list.querySelector('.palette-item.is-active');
    const lr = list.getBoundingClientRect();
    const ir = item.getBoundingClientRect();
    return {
      scrollTop: Math.round(list.scrollTop),
      activeLabel: item.textContent.trim(),
      visible: ir.top >= lr.top - 1 && ir.bottom <= lr.bottom + 1,
    };
  });
  console.log('PALETTE', JSON.stringify(palette));
  await page.screenshot({ path: 'shots/15-palette-scrolled.png' });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  // 2. case study next/prev
  await page.locator('#work').scrollIntoViewIfNeeded();
  await page.locator('.pc-open').first().click();
  await page.waitForTimeout(500);
  const t1 = await page.locator('.case-title').innerText();
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(300);
  const t2 = await page.locator('.case-title').innerText();
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(300);
  const t3 = await page.locator('.case-title').innerText();
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  console.log('CASESTUDY', JSON.stringify({ t1, t2, t3, closed: (await page.locator('.case-modal').count()) === 0 }));

  // 3. lab retrieval
  await page.locator('#lab').scrollIntoViewIfNeeded();
  await page.locator('#lab-query').fill('What is his CGPA and degree?');
  await page.locator('.lab-submit').click();
  await page.waitForTimeout(1200);
  const firstResult = await page.locator('.result').first().innerText();
  console.log('LAB', JSON.stringify({ hasCgpa: /8\.34/.test(firstResult), first: firstResult.split('\n')[0].slice(0, 80) }));

  // 4. theme persists
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.locator('.nav-right .icon-btn').first().click();
  await page.waitForTimeout(400);
  const themeBefore = await page.evaluate(() => document.documentElement.dataset.theme);
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  const themeAfter = await page.evaluate(() => document.documentElement.dataset.theme);
  console.log('THEME', JSON.stringify({ themeBefore, themeAfter, persisted: themeBefore === themeAfter }));
  await page.evaluate(() => localStorage.setItem('mrs-theme', 'dark'));

  // 5. anchor offset (nav link)
  await page.locator('.nav-link', { hasText: 'Lab' }).click();
  await page.waitForTimeout(1400);
  const labTop = await page.evaluate(() => Math.round(document.querySelector('#lab').getBoundingClientRect().top));
  console.log('ANCHOR', JSON.stringify({ labTop }));

  // 6. mobile menu link closes menu
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await mobile.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await mobile.waitForTimeout(2500);
  const widthInfo = await mobile.evaluate(() => ({ inner: window.innerWidth, scroll: document.documentElement.scrollWidth }));
  await mobile.locator('.nav-toggle').click();
  await mobile.waitForTimeout(400);
  await mobile.locator('.mobile-link', { hasText: 'Contact' }).click();
  await mobile.waitForTimeout(1400);
  const menuGone = (await mobile.locator('.mobile-menu').count()) === 0;
  const contactVisible = await mobile.evaluate(() => {
    const r = document.querySelector('#contact').getBoundingClientRect();
    return Math.round(r.top);
  });
  console.log('MOBILE', JSON.stringify({ widthInfo, menuGone, contactTop: contactVisible }));

  console.log('ERRORS', errors.length ? errors : 'none');
  await browser.close();
})();
