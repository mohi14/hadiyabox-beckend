const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
