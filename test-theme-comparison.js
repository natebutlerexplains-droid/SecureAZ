const puppeteer = require('puppeteer');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testThemeComparison() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    page.setViewport({ width: 1400, height: 1200 });

    console.log('📸 Testing DARK MODE dashboard...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await sleep(2000);

    // Clear theme to ensure dark mode
    await page.evaluate(() => {
      localStorage.removeItem('theme');
      document.documentElement.removeAttribute('data-theme');
    });
    await sleep(1000);

    await page.screenshot({ path: 'screenshot-dark-compare.png', fullPage: true });
    console.log('✅ Dark mode screenshot saved');

    console.log('\n📸 Testing LIGHT MODE dashboard...');
    await page.reload({ waitUntil: 'networkidle2' });
    await sleep(2000);

    await page.evaluate(() => {
      localStorage.setItem('theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await sleep(1000);

    await page.screenshot({ path: 'screenshot-light-compare.png', fullPage: true });
    console.log('✅ Light mode screenshot saved');

    console.log('\n✅ Theme comparison complete!');
    console.log('Compare: screenshot-dark-compare.png vs screenshot-light-compare.png');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

testThemeComparison();
