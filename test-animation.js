const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  // Load dashboard
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  
  // Take baseline screenshot
  await page.screenshot({ path: '/tmp/anim-1-dashboard.png' });
  console.log('1. Dashboard screenshot saved');
  
  // Click Reports button
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    buttons.find(b => b.textContent.includes('Reports'))?.click();
  });
  
  // Screenshot mid-transition (240ms into 480ms animation)
  await new Promise(resolve => setTimeout(resolve, 240));
  await page.screenshot({ path: '/tmp/anim-2-mid-transition.png' });
  console.log('2. Mid-transition screenshot saved');
  
  // Wait for animation to complete
  await new Promise(resolve => setTimeout(resolve, 250));
  await page.screenshot({ path: '/tmp/anim-3-reports.png' });
  console.log('3. Reports screenshot saved');
  
  // Click back to dashboard
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    buttons.find(b => b.textContent.includes('Dashboard'))?.click();
  });
  await new Promise(resolve => setTimeout(resolve, 240));
  await page.screenshot({ path: '/tmp/anim-4-return-mid.png' });
  console.log('4. Return transition screenshot saved');
  
  await browser.close();
})();
