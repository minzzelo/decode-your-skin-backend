const router = require("express").Router();

const puppeteer = require('puppeteer');


router.post('/', async (req, res) => {
    console.log(req.body.name);
    let productName = req.body.name.toLowerCase();

    let url = "https://incidecoder.com/products/" + productName.replace(/\s+/g, '-');
    let ewg = "https://www.ewg.org/skindeep/search/?utf8=%E2%9C%93&search=" +productName.replace(/\s+/g, '+');

    const browser = await puppeteer.launch({headless : true});
    const incideDecoderPage = await browser.newPage();
   
    await incideDecoderPage.goto(url);

    const ewgPage = await browser.newPage();
    await ewgPage.goto(ewg);

    try {
        //extracting data

        let score = await ewgPage.evaluate(() => {
            let score = document.querySelector(".product-score > img");
            return score ? score.src : "";
        })

        let information = await incideDecoderPage.evaluate(() => {
            //div with links 
            //let ingredList = document.querySelector("#ingredlist-short");
            let ingredList = document.querySelector("#showmore-section-ingredlist-short").innerText;
            let imageURL = document.querySelector("#product-main-image > picture > img").src;
            let description = document.querySelector("#product-details").innerText;
            return {ingredList,imageURL, description};

        })

        let table = await incideDecoderPage.evaluate(() => {
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

        return res.status(200).send({score, information, table});

    } catch (err) {
        return res.status(400).send("We do not have information on this product :((");
    }

})

module.exports = router;