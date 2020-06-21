const router = require("express").Router();
const Product = require('../models/product');


//saving a product 
router.post('/', (req, res) => {
    

    const name = req.body.productName;
    const ingredients = req.body.ingredients;
    const ingredDetails = req.body.ingredDetails;

    console.log(ingredients);
    console.log(ingredDetails);

    const newProduct = new Product({name: name, ingredients: ingredients, ingredDetails: ingredDetails});

    Product.findOne({name : name}).then((result) => {
        if (!result) { //PRODUCT DOES NOT EXIST IN DATABASE
            newProduct.save()
            .then(() => res.status(200).send("Item has been Favourited!"))
            .catch((err) => res.status(400).send("ERROR : " + err));  
        } else {
            res.status(200).send("Item in database!");
        }
    }).catch((err) => res.status(400).send("ERROR : " + err));
 
})


module.exports = router;