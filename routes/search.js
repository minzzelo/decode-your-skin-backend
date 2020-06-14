const router = require("express").Router();

const puppeteer = require('puppeteer');


router.post('/', async (req, res) => {
    console.log(req.body.productName);
    let productName = req.body.productName;

    //replace space with -
    productName = productName.replace(/\s+/g, '-');

    let url = "https://incidecoder.com/products/" + productName;

    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage();
    await page.goto(url);

    //extracting data
    let data = await page.evaluate(() => {
        //div with links 
        //let ingredList = document.querySelector("#ingredlist-short");
        let ingredList = document.querySelector("#showmore-section-ingredlist-short").innerText;
        let productDetails = document.querySelector("#product-details").innerText;
        return {ingredList, productDetails};

    })

    let table = await page.evaluate(() => {
        //retrieve table body
        let table = document.querySelector(".product-skim tbody");
        let rows = Array.from(table.children).slice(0, 10);
        
        let data = rows.map(row => {
            const columns = row.querySelectorAll('td');
            return Array.from(columns, column => column.innerText);
          });

        return data;
    
    });

    console.log(table[0][0]);

    browser.close();

    return res.status(200).send({ingredients: data.ingredList, tableData: table});
})

module.exports = router;