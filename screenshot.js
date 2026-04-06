const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1024 });
  
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.screenshot({ path: '/tmp/findings-card.png' });
    console.log('Screenshot saved');
  } catch (e) {
    console.error('Error:', e.message);
  }
  
  await browser.close();
})();
