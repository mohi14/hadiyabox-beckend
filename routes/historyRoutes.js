const express = require("express");
const {
  getAllHistory,
  getUserHistory,
  deleteAllHistory,
} = require("../controller/historyController");
const router = express.Router();

// get all history
router.get("/", getAllHistory);

// get ticket based on userId
router.get("/:id", getUserHistory);

router.delete("/delete", deleteAllHistory);

module.exports = router;
