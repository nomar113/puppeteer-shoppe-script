const credentials = require("../credentials.json");

const fetch = require('node-fetch');

module.exports = async (page) => {
  await page.goto(
    "https://shopee.com.br/buyer/login?next=https%253A%252F%252Fshopee.com.br%252Fshopee-coins%252F", {
      timeout: 0
    }
  );

  await page.title(
    "Shopee Brasil | Ofertas incríveis. Melhores preços do mercado"
  );  

  await page.waitForSelector('input[name="loginKey"]');

  await page.type('input[name="loginKey"]', credentials.shopee.username, {
    delay: 100,
  });

  await page.type('input[name="password"]', credentials.shopee.password, {
    delay: 100,
  });

  await page.keyboard.press("Enter");

  await page.title("Central de Moedas");

  try {
    const getDailyCoins = await page
      .waitForXPath("//*[contains(text(), 'Clique para ganhar')]")
      .then((element) => {
        element.click();
      });
    getDailyCoins.click();
    console.log('Get the daily coins!');
  } catch {
    console.log("Daily Coins got!");
  }
};
