const router = require("express").Router();

const puppeteer = require('puppeteer');


router.post('/', async (req, res) => {

    let productName = req.body.productName;


    productName = productName.replace(/\s+/g, '+');


    const url = 'https://www.ewg.org/skindeep/search/?utf8=%E2%9C%93&search=' + productName;

    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage();
    await page.goto(url);

    //extracting data
    let data = await page.evaluate(() => {
        let productURL = document.querySelector('.product-tile > a').href;
        let companyName = document.querySelector('.product-company').innerText;
   
        
        let name = document.querySelector('.product-name').innerText;
  
        let product = companyName + " " + name;
        let score = document.querySelector('.product-score > img').src;
        let productImage = document.querySelector('.product-image-wrapper.flex > img').src;

        return {product, score, productImage};
    })

    browser.close();

    return res.status(200).send({ name: data.product, productImage: data.productImage, score: data.score});

})

module.exports = router;