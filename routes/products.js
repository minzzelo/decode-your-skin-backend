const router = require("express").Router();

const productController = require("../controllers/productController");

router.post("saveProduct/:name", productController.newUserProduct);

router.get("/:name", productController.getUserProducts);

module.exports = router;