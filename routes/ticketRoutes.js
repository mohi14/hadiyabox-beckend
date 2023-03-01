const express = require("express");
const { isAdmin } = require("../config/auth");
const router = express.Router();

const {
  addTicket,
  deleteTicket,
  getTicket,
  updateTicketStatus,
} = require("../controller/ticketController");

// add ticket
router.post("/add", addTicket);

// delete ticket
router.post("/remove/:id", isAdmin, deleteTicket);

// get ticket
router.get("/", getTicket);

//update ticket status
router.put("/status/:id", isAdmin, updateTicketStatus);

module.exports = router;
