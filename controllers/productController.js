const User = require("../models/user");
const Product = require("../models/product");
const async = require("async");

//GET ALL PRODUCTS OF USER
exports.getUserProducts = async(req, res) => {
    
    const user = await User.findOne({username: req.params.name})
                           .populate('products'); //replace all product id with product details

    return res.status(200).json(user.products);
}

//WHEN USER FAVOURITE A PRODUCT
exports.newUserProduct = async (req, res) => {

    const newProduct = new Product(req.body);
    const username = req.params.name;

    const user = await User.findOne({username : username});

    Product.findOne({productName: req.body.productName})
            .then((product) => {
                //product does not exist in database
                if (!product) {
                    newProduct.save();
                }
            }).catch((err) => console.log(err));

    //add newProduct to user's product array
    user.products.push(newProduct);
    await user.save()
              .then(() => res.status(200).json(newProduct))
              .catch((err) => res.status(400).send(err));


}

exports.deleteProduct = async (req, res) => {

    const username = req.params.name;
    const productid = req.params.id;


    const user = await User.findOne({username : username});
    user.products.pull(productid);

    await user.save()
              .then(() => res.status(200).json({success : true}))
              .catch((err) => res.status(400).send(err));

}