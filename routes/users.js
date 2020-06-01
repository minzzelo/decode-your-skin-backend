const router = require("express").Router();

const userController = require("../controllers/userController");

router.post("/registerUser", userController.validate("registerUser"), 
                             userController.registerUser);

router.post("/login", userController.validate("loginUser"), userController.loginUser);


module.exports = router;
