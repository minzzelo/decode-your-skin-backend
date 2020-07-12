const express = require("express");
const router = express.Router();

const threadController = require("../controllers/threadController");

router.post("/createThread", threadController.createThread);

router.post("/getAllThreads", threadController.getAllThreads);

// // router.post("/getPost", postController.getPost);

// // router.post("/deletePost", postController.deletePost);

module.exports = router;
