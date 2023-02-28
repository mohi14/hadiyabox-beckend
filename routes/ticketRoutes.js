const express = require("express");
const { isAdmin } = require("../config/auth");
const router = express.Router();

const {
  addTicket,
  deleteTicket,
  getTicket,
} = require("../controller/ticketController");

// add ticket
router.post("/add", addTicket);

// delete ticket
router.post("/remove/:id", isAdmin, deleteTicket);

// get ticket
router.get("/", getTicket);

module.exports = router;
