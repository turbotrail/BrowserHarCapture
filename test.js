const puppeteer = require('puppeteer-core');
const PuppeteerHar = require('puppeteer-har');

(async () => {
  const browser = await puppeteer.launch({executablePath: 'chrome.exe',headless: false});
  console.log(await browser.pages());
  const page = await browser.newPage();
  const har = new PuppeteerHar(page);
  await page.setViewport({ width: 1366, height: 768});
  await har.start({ path: 'results.har' });
  await page.goto('https://www.xfinity.com/mobile/');
  // await page.waitFor(20000);
  await page.waitForXPath("//img[@alt='Google']",{timeout: 0})
  await har.stop();
  await browser.close();
})();

