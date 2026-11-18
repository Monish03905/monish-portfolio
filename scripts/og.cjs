const { chromium } = require('playwright-core');
const fs = require('fs');

const portrait = fs.readFileSync('src/assets/portrait.jpg').toString('base64');

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@300;400;500;600&display=swap" rel="stylesheet" />
<style>
  * { box-sizing: border-box; margin: 0; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: #07090b; color: #f2efe7;
    font-family: 'Space Grotesk', sans-serif;
    position: relative;
  }
  .grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(242,239,231,.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(242,239,231,.07) 1px, transparent 1px);
    background-size: 96px 96px;
    mask-image: radial-gradient(ellipse 85% 80% at 60% 40%, #000 20%, transparent 80%);
  }
  .glow {
    position: absolute; width: 900px; height: 700px; right: -260px; top: -280px;
    background: radial-gradient(closest-side, rgba(201,247,90,.16), transparent 72%);
  }
  .glow2 {
    position: absolute; width: 700px; height: 600px; left: -240px; bottom: -320px;
    background: radial-gradient(closest-side, rgba(185,166,255,.1), transparent 72%);
  }
  .frame { position: relative; height: 100%; padding: 62px 68px; display: flex; flex-direction: column; justify-content: space-between; }
  .top { display: flex; align-items: center; justify-content: space-between; }
  .brand { display: flex; align-items: center; gap: 14px; }
  .mark {
    width: 44px; height: 44px; border: 1px solid rgba(242,239,231,.28); border-radius: 12px;
    display: grid; place-items: center; font-family: 'JetBrains Mono', monospace; font-size: 14px;
  }
  .brand span { font-family: 'JetBrains Mono', monospace; font-size: 13px; letter-spacing: .18em; text-transform: uppercase; color: #b5b3aa; }
  .avail {
    display: inline-flex; align-items: center; gap: 10px; padding: 9px 16px; border-radius: 99px;
    border: 1px solid rgba(201,247,90,.34); background: rgba(201,247,90,.07);
    font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .15em;
    text-transform: uppercase; color: #c9f75a;
  }
  .dot { width: 6px; height: 6px; border-radius: 50%; background: #c9f75a; }
  .mid { display: flex; align-items: center; justify-content: space-between; gap: 40px; }
  .copy { max-width: 700px; }
  .name { font-size: 104px; line-height: .9; letter-spacing: -.055em; font-weight: 500; }
  .name em { display: block; font-family: 'Instrument Serif', serif; font-style: italic; font-weight: 400; letter-spacing: -.02em; }
  .name em::after { content: '.'; color: #c9f75a; font-style: normal; }
  .tag {
    margin-top: 22px; font-family: 'Instrument Serif', serif; font-style: italic;
    font-size: 31px; line-height: 1.3; color: #b5b3aa; max-width: 24ch;
  }
  .tag b { color: #c9f75a; font-weight: 400; }
  .stats { display: flex; gap: 42px; margin-top: 30px; }
  .stat { border-top: 1px solid rgba(242,239,231,.16); padding-top: 12px; }
  .stat b { display: block; font-size: 26px; font-weight: 500; letter-spacing: -.04em; }
  .stat:first-child b { color: #c9f75a; }
  .stat span { display: block; margin-top: 5px; font-family: 'JetBrains Mono', monospace; font-size: 9.5px; letter-spacing: .14em; text-transform: uppercase; color: #7c8078; }
  .portrait { position: relative; width: 286px; height: 366px; flex-shrink: 0; border-radius: 18px; overflow: hidden; border: 1px solid rgba(242,239,231,.26); }
  .portrait img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 20%; filter: grayscale(1) contrast(1.08) brightness(.88); transform: scale(1.32); transform-origin: 53% 20%; }
  .portrait::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(7,9,11,.5) 0%, transparent 30%, transparent 48%, rgba(7,9,11,.9) 100%); }
  .portrait::after {
    content: 'SUBJECT 001'; position: absolute; left: 15px; bottom: 14px;
    padding: 5px 9px; border-radius: 7px;
    background: rgba(7,9,11,.74); border: 1px solid rgba(201,247,90,.32);
    font-family: 'JetBrains Mono', monospace; font-size: 9.5px; letter-spacing: .16em; color: #c9f75a;
  }
  .corner { display: none; }
  .coords {
    position: absolute; right: 15px; bottom: 19px;
    font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: .13em;
    color: rgba(201,247,90,.8); text-shadow: 0 1px 4px rgba(7,9,11,.9);
  }
  .foot { display: flex; align-items: center; justify-content: space-between; padding-top: 16px; border-top: 1px solid rgba(242,239,231,.14); }
  .foot span { font-family: 'JetBrains Mono', monospace; font-size: 10.5px; letter-spacing: .14em; text-transform: uppercase; color: #7c8078; }
  .foot b { color: #f2efe7; font-weight: 400; }
</style>
</head>
<body>
  <div class="grid"></div>
  <div class="glow"></div>
  <div class="glow2"></div>
  <div class="frame">
    <div class="top">
      <div class="brand"><div class="mark">MR</div><span>Portfolio / 2026</span></div>
      <div class="avail"><span class="dot"></span>Open to AI/ML internships</div>
    </div>

    <div class="mid">
      <div class="copy">
        <div class="name">Monish Ratan<em>Seelam</em></div>
        <div class="tag">I build AI systems that <b>see</b>, <b>retrieve</b>, and <b>verify</b>.</div>
        <div class="stats">
          <div class="stat"><b>8.34</b><span>CGPA · B.Tech AI &amp; DS</span></div>
          <div class="stat"><b>9,754</b><span>Chunks in FAISS</span></div>
          <div class="stat"><b>6-DOF</b><span>Gesture-flown drone</span></div>
          <div class="stat"><b>3</b><span>Live deployed apps</span></div>
        </div>
      </div>

      <div class="portrait">
        <img src="data:image/jpeg;base64,${portrait}" />
        <span class="coords">16.50°N 80.64°E</span>
      </div>
    </div>

    <div class="foot">
      <span>B.Tech · Artificial Intelligence &amp; Data Science</span>
      <span>KL University · <b>monish03905@gmail.com</b></span>
    </div>
  </div>
</body>
</html>`;

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'public/og.jpg', type: 'jpeg', quality: 92 });
  console.log('wrote public/og.jpg');
  await browser.close();
})();
