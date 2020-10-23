const puppeteer = require("puppeteer");

const shopeeGetDailyCoins = require("./shopee.js");

(async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null, });
  const page = await browser.newPage();

  await shopeeGetDailyCoins(page);

  await page.goto('https://shopee.com.br/pc_event/?url=https%3A%2F%2Fgames.shopee.com.br%2Fluckydraw%2Fbox%2Factivity%2F98e3907a3419e0e4', {
    timeout: 0
  });
  
  await page.title('Shopee Brasil | Ofertas incríveis. Melhores preços do mercado');

  await page.waitFor(100000);

  const frames = await page.frames();

  await frames[1].waitForSelector('div#clickArea', {
    timeout: 0
  });
  
  const goldenEgg = await frames[1].$('div#clickArea');

  await goldenEgg.click();

  await browser.close();
})();
