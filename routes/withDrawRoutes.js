const express = require("express");
const {
  addWithDraw,
  getAllWithDraw,
  getWithDrawByUser,
  updateWithDrawStatus,
  rejectWithdraw,
} = require("../controller/withDrawController");
const router = express.Router();

// add withdraw
router.post("/add/:id", addWithDraw);

// get all withDraw
router.get("/", getAllWithDraw);

// get ticket based on userId
router.get("/:id", getWithDrawByUser);

//update ticket status
router.put("/status/:id", updateWithDrawStatus);

// //withdraw ticket status
// router.put("/status/withdraw/:id", isAdmin, withdrawTicketStatus);

// // reject withdraw
router.put("/status/rejected/:id", rejectWithdraw);

module.exports = router;
