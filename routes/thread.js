const express = require("express");
const router = express.Router();

const threadController = require("../controllers/threadController");

router.post("/createThread", threadController.createThread);

router.post("/getThread", threadController.getThread);

router.post("/getAllThreads", threadController.getAllThreads);

router.post("/deleteThread", threadController.deleteThread);

module.exports = router;
