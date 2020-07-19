const express = require("express");
const router = express.Router();

const threadPostController = require("../controllers/threadPostController");

router.post("/createThreadPost", threadPostController.createThreadPost);

router.post("/deleteThreadPost", threadPostController.deleteThreadPost);

router.post("/getAllThreadPost", threadPostController.getAllThreadPosts);

module.exports = router;