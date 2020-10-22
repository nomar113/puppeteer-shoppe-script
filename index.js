const puppeteer = require("puppeteer");

const credentials = require("./credentials.json");

(async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null, });
  const page = await browser.newPage();

  await page.goto(
    "https://shopee.com.br/buyer/login?next=https%253A%252F%252Fshopee.com.br%252Fshopee-coins%252F", {
      timeout: 0
    }
  );

  await page.title(
    "Shopee Brasil | Ofertas incríveis. Melhores preços do mercado"
  );  

  await page.waitForSelector('input[name="loginKey"]');

  await page.type('input[name="loginKey"]', credentials.username, {
    delay: 100,
  });

  await page.type('input[name="password"]', credentials.password, {
    delay: 100,
  });

  await page.keyboard.press("Enter");

  await page.title("Central de Moedas");

  try {
    const getDailyCoins = await page
      .waitForXPath("//*[contains(text(), 'Clique para ganhar')]", {
        timeout: 5000,
      })
      .then((element) => {
        element.click();
      });
    getDailyCoins.click();
    console.log('Get the daily coins!');
  } catch {
    console.log("Daily Coins got!");
  }

  await page.goto('https://shopee.com.br/pc_event/?url=https%3A%2F%2Fgames.shopee.com.br%2Fluckydraw%2Fbox%2Factivity%2F98e3907a3419e0e4', {
    timeout: 0
  });
  
  await page.title('Shopee Brasil | Ofertas incríveis. Melhores preços do mercado');

  await page.waitFor(10000);

  const frames = await page.frames();

  await frames[1].waitForSelector('div#clickArea', {
    timeout: 0
  });
  
  const goldenEgg = await frames[1].$('div#clickArea');

  await goldenEgg.click();

  await browser.close();
})();
