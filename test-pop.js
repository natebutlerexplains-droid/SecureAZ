const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  // Load dashboard
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  
  // Take baseline screenshot
  await page.screenshot({ path: '/tmp/pop-1-dashboard.png' });
  console.log('1. Dashboard loaded');
  
  // Click Reports tab
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    buttons.find(b => b.textContent.includes('Reports'))?.click();
  });
  
  // Screenshot mid-animation (250ms into 500ms)
  await new Promise(resolve => setTimeout(resolve, 250));
  await page.screenshot({ path: '/tmp/pop-2-mid-pop.png' });
  console.log('2. Mid-pop animation');
  
  // Wait for completion
  await new Promise(resolve => setTimeout(resolve, 270));
  await page.screenshot({ path: '/tmp/pop-3-reports.png' });
  console.log('3. Reports landed');
  
  // Click Settings
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    buttons.find(b => b.textContent.includes('Configs'))?.click();
  });
  
  await new Promise(resolve => setTimeout(resolve, 250));
  await page.screenshot({ path: '/tmp/pop-4-mid-pop2.png' });
  console.log('4. Mid-pop to Configs');
  
  await browser.close();
})();
