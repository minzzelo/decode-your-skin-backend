const router = require("express").Router();

const puppeteer = require('puppeteer');


router.post('/', async (req, res) => {
    console.log(req.body.name);
    let productName = req.body.name;

    //replace space with -
    productName = productName.replace(/\s+/g, '-');

    let url = "https://incidecoder.com/products/" + productName;

    const browser = await puppeteer.launch({headless : true});
    const page = await browser.newPage();
    await page.goto(url);

    try {
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

        browser.close();

        return res.status(200).send({ingredients: data.ingredList, tableData: table});

    } catch (err) {
        return res.status(400).send("No Such Product Found");
    }

})

module.exports = router;