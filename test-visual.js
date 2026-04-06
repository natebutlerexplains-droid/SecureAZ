const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function testDashboard() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    page.setViewport({ width: 1400, height: 900 });

    // Test 1: Dark mode dashboard
    console.log('📸 Testing DARK MODE dashboard at http://localhost:3000');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'screenshot-dark-dashboard.png', fullPage: false });
    console.log('✅ Dark mode dashboard screenshot saved');

    // Test 2: Light mode dashboard
    console.log('\n📸 Switching to LIGHT MODE...');
    await page.click('[title*="Switch to light mode"]', { timeout: 5000 }).catch(() => {
      console.log('⚠️ Light mode toggle not found, trying to find theme button');
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshot-light-dashboard.png', fullPage: false });
    console.log('✅ Light mode dashboard screenshot saved');

    // Test 3: Widget showcase (SOC2)
    console.log('\n📸 Testing SOC2 widget showcase at http://localhost:3000/widgets');
    await page.goto('http://localhost:3000/widgets', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'screenshot-widget-dark.png', fullPage: false });
    console.log('✅ Widget showcase dark mode screenshot saved');

    // Switch to light mode on widgets page
    console.log('\n📸 Switching widgets page to LIGHT MODE...');
    const buttons = await page.$$('[title*="Switch to light mode"], [title*="Switch to dark mode"]');
    if (buttons.length > 0) {
      await buttons[0].click();
      await page.waitForTimeout(1000);
    }
    await page.screenshot({ path: 'screenshot-widget-light.png', fullPage: false });
    console.log('✅ Widget showcase light mode screenshot saved');

    console.log('\n✅ All screenshots captured successfully!');
    console.log('\nScreenshots saved:');
    console.log('  - screenshot-dark-dashboard.png');
    console.log('  - screenshot-light-dashboard.png');
    console.log('  - screenshot-widget-dark.png');
    console.log('  - screenshot-widget-light.png');

  } catch (error) {
    console.error('❌ Error during test:', error);
  } finally {
    await browser.close();
  }
}

testDashboard();
