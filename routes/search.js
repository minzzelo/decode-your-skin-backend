const router = require("express").Router();

const puppeteer = require('puppeteer');


router.post('/', async (req, res) => {
    console.log(req.body.name);
    let productName = req.body.name;

    let url = "https://incidecoder.com/products/" + productName.replace(/\s+/g, '-');
    let ewg = "https://www.ewg.org/skindeep/search/?utf8=%E2%9C%93&search=" +productName.replace(/\s+/g, '+');

    const browser = await puppeteer.launch({headless : false});
    const incideDecoderPage = await browser.newPage();
   
    await incideDecoderPage.goto(url);

    const ewgPage = await browser.newPage();
    await ewgPage.goto(ewg);

    try {
        //extracting data
        let data = await incideDecoderPage.evaluate(() => {
            //div with links 
            //let ingredList = document.querySelector("#ingredlist-short");
            let ingredList = document.querySelector("#showmore-section-ingredlist-short").innerText;
            let productDetails = document.querySelector("#product-details").innerText;
            return {ingredList, productDetails};

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


        let images = await ewgPage.evaluate(() => {
            
            let score = document.querySelector('.product-score > img').src;
            let productImage = document.querySelector('.product-image-wrapper.flex > img').src;

            return {score, productImage};
        
        });

        browser.close();

        return res.status(200).send({ingredients: data.ingredList, tableData: table, 
                                    score: images.score, image: images.productImage});

    } catch (err) {
        return res.status(400).send("We do not have information on this product :((");
    }

})

module.exports = router;