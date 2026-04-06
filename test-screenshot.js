const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 10000 });
    await page.screenshot({ path: '/tmp/findings-check.png', fullPage: false });
    console.log('Screenshot saved');
  } catch (e) {
    console.error('Error:', e.message);
  }
  
  await browser.close();
})();
