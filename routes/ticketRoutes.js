const express = require("express");
const router = express.Router();

const { addTicket } = require("../controller/ticketController");

// add ticket
router.post("/add", addTicket);

// delete ticket
router.post("/remove/:id");

module.exports = router;
