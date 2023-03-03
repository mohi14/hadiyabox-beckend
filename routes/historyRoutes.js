const express = require("express");
const { getAllHistory } = require("../controller/historyController");
const router = express.Router();

// get all history
router.get("/", getAllHistory);

module.exports = router;
