//experiment
const router = require("express").Router();
const puppeteer = require("puppeteer");

//extract product info according to url
router.route("/products").post(async (req, res) => {
  const url = req.body.url;

  const browser = await puppeteer.launch({headless : false});
  const page = await browser.newPage();
  await page.goto(url);

  const [name] = await page.$x('//*[@id="product"]/h2');
  const pdt = await name.getProperty("textContent");
  const pdtName = await pdt.jsonValue();
  console.log(pdtName);

  const [image] = await page.$x('//*[@id="product"]/div[2]/div[2]/img');
  const src = await image.getProperty("src");
  const imgSrc = await src.jsonValue();

  browser.close();

  return res.status(200).send({ name: pdtName, src: imgSrc });
});

module.exports = router;
