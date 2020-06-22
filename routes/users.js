const router = require("express").Router();

const userController = require("../controllers/userController");
const productController = require("../controllers/productController");

router.post("/registerUser", userController.validate("registerUser"), 
                             userController.registerUser);

router.post("/login", userController.validate("loginUser"), userController.loginUser);

router.post("/:name", userController.getUser);




module.exports = router;
