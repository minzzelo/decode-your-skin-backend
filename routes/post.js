const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.post("/createPost", postController.createPost);

router.post("/getPost", postController.getPost);

router.post("/deletePost", postController.deletePost);

module.exports = router;
