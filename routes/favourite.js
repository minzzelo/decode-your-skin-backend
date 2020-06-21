const router = require("express").Router();
const Product = require('../models/product');
const User = require('../models/user');

const productController = require("../controllers/productController");

router.post("/", productController.addProduct);

module.exports = router;