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

  fetch("https://shopee.com.br/mkt/coins/api/v2/checkin", {
    "headers": {
      "accept": "application/json",
      "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/json",
      "if-none-match-": "55b03-afb69e438c4b48e93e5e3a9f7e6a9111",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-api-source": "pc",
      "x-csrftoken": "LvLA8UdSKacnhhsYUZpCTq2bISirUDSG",
      "x-requested-with": "XMLHttpRequest",
      "x-shopee-language": "pt-BR",
      "cookie": "__kdtv=t%3D1601230797530%3Bi%3D5e2dff8a4f31a46df01c97c25aafa5cb2d92cf0e; _fbp=fb.2.1601948238477.679839162; _ga=GA1.3.212068544.1601858364; _gcl_au=1.1.2015477405.1601858362; _kdt=%7B%22t%22%3A1601230797530%2C%22i%22%3A%225e2dff8a4f31a46df01c97c25aafa5cb2d92cf0e%22%7D; _med=refer; G_ENABLED_IDPS=google; REC_T_ID=3664f0b3-06a3-11eb-9006-08f1ea7c04f4; SPC_CLIENTID=IPVuUng7N0dwYvQJsgmriahabxamrzvl; SPC_F=IPVuUng7N0dwYvQJHcVCweaPNxPlfOBx; SPC_U=305983177; SPC_EC=viYOE3iBFJLApg94OrL/+nYP+AdXPI/tikejFZjd8TXc30KGYw7qQmVIx/SbYuQCeRBA1gzRBi5pC9T8SnV3yhuzqKxAe3yni2WyqSmH78l/KB46hpP+NEhH8Ai3qNIuoAKGzVPOiEqJlIb0aj/E0oPWd8siXWMJA/01W6wqUnE=; _gid=GA1.3.663772735.1603288109; SPC_SI=jghchfdoh5fs803oaea4rk4lhqunch68; SPC_IA=1; csrftoken=LvLA8UdSKacnhhsYUZpCTq2bISirUDSG; AMP_TOKEN=%24NOT_FOUND; welcomePkgShown=true; SPC_R_T_ID=\"pXxPvgMO7Vw7i/f/klrtN4JkwrZGHVTgARvypPvCZ27abHhkDbqKkyi7WUUOgHxQQFJk6NOFFztiBSna7GA8t27vQOiRiMkPu2AZkrLD5Gs=\"; SPC_T_IV=\"7FcciUDM1mRSqSp/7f2H6g==\"; SPC_R_T_IV=\"7FcciUDM1mRSqSp/7f2H6g==\"; SPC_T_ID=\"pXxPvgMO7Vw7i/f/klrtN4JkwrZGHVTgARvypPvCZ27abHhkDbqKkyi7WUUOgHxQQFJk6NOFFztiBSna7GA8t27vQOiRiMkPu2AZkrLD5Gs=\""
    },
    "referrer": "https://shopee.com.br/shopee-coins/?smtt=210.2387",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "POST",
    "mode": "cors"
  }).then(data => {
    console.log(data);
  })

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
