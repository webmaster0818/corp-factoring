const { chromium } = require('playwright');
const path = require('path');

const companies = [
  { slug: 'be-trading', url: 'https://betrading.jp/' },
  { slug: 'ququmo', url: 'https://ququmo.net/' },
  { slug: 'accel-factor', url: 'https://accelfacter.co.jp/' },
  { slug: 'best-factor', url: 'https://bestfactor.jp/' },
  { slug: 'pmg', url: 'https://p-m-g.tokyo/' },
  { slug: 'paytner', url: 'https://paytner.co.jp/factoring' },
  { slug: 'labol', url: 'https://labol.co.jp/' },
  { slug: 'paytoday', url: 'https://paytoday.jp/' },
  { slug: 'support-kinyu', url: 'https://chushokigyo-support.or.jp/' },
  { slug: 'mf-earlypayment', url: 'https://mfkessai.co.jp/early-payment/' },
  { slug: 'top-management', url: 'https://top-management.co.jp/' },
  { slug: 'mentor-capital', url: 'https://mentor-capital.jp/' },
  { slug: 'ennavi', url: 'https://ennavi.tokyo/' },
  { slug: 'freenance', url: 'https://freenance.net/' },
  { slug: 'minna-factoring', url: 'https://minna-factoring.com/' },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const outDir = path.join(__dirname, '..', 'public', 'images', 'companies');

  for (const company of companies) {
    try {
      const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
      await page.goto(company.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(2000);
      const filePath = path.join(outDir, `${company.slug}.png`);
      await page.screenshot({ path: filePath, clip: { x: 0, y: 0, width: 1200, height: 630 } });
      console.log(`✅ ${company.slug}: ${filePath}`);
      await page.close();
    } catch (e) {
      console.log(`❌ ${company.slug}: ${e.message.slice(0, 80)}`);
    }
  }

  await browser.close();
  console.log('\nDone!');
})();
