const express = require("express");
const { isAdmin, isAuth } = require("../config/auth");
const router = express.Router();

const {
  addTicket,
  deleteTicket,
  getTicket,
  updateTicketStatus,
  withdrawTicketStatus,
} = require("../controller/ticketController");

// add ticket
// router.post("/add", isAuth, addTicket);
router.post("/add/:id", addTicket);

// delete ticket
router.delete("/remove/:id", deleteTicket);

// get ticket
router.get("/", getTicket);

//update ticket status
router.put("/status/:id", isAdmin, updateTicketStatus);

//withdraw ticket status
router.put("/status/withdraw/:id", isAdmin, withdrawTicketStatus);

module.exports = router;
