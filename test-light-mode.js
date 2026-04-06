const puppeteer = require('puppeteer');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testLightMode() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    page.setViewport({ width: 1400, height: 1200 });

    console.log('🔄 Loading dashboard...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await sleep(2000);

    console.log('🌙 Switching to light mode...');
    // Set theme to light
    await page.evaluate(() => {
      localStorage.setItem('theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
    });

    await sleep(1000);

    console.log('📸 Capturing light mode screenshot (full page)...');
    await page.screenshot({ path: 'screenshot-light-mode.png', fullPage: true });
    console.log('✅ Light mode screenshot saved');

    console.log('📸 Capturing light mode viewport screenshot...');
    await page.screenshot({ path: 'screenshot-light-viewport.png', fullPage: false });
    console.log('✅ Light mode viewport screenshot saved');

    // Scroll to bottom and capture
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(500);
    console.log('📸 Capturing light mode bottom section...');
    await page.screenshot({ path: 'screenshot-light-bottom.png', fullPage: false });
    console.log('✅ Light mode bottom screenshot saved');

    // Test widgets page in light mode
    console.log('\n📸 Testing SOC2 widget page in light mode...');
    await page.goto('http://localhost:3000/widgets', { waitUntil: 'networkidle2' });
    await sleep(1000);
    // Re-apply light mode since it's a new page
    await page.evaluate(() => {
      localStorage.setItem('theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await sleep(1000);
    await page.screenshot({ path: 'screenshot-widget-light-mode.png', fullPage: false });
    console.log('✅ Widget light mode screenshot saved');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

testLightMode();
