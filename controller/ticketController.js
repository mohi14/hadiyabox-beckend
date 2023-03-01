const Ticket = require("../models/Ticket");
const User = require("../models/User");

const addTicket = async (req, res) => {
  const { name, amount, image, status } = req.body;
  try {
    const newTicket = new Ticket({ name, amount, image, status });
    //   console.log(newTicket, "okay");
    await newTicket.save();
    res.status(200).send({
      message: "Ticket Added successfully",
      status: 200,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      status: 500,
    });
  }
  //   console.log(req.body, "hello");
};

const deleteTicket = async (req, res) => {
  //   const { wallet } = req.body;
  Ticket.deleteOne({ _id: req.params.id }, (error) => {
    if (error) {
      res.status(500).send({
        message: error.message,
        status: 500,
      });
    } else {
      res.status(200).send({
        message: "Ticket Deleted Successfully",
        status: 200,
      });
    }
  });
};

const getTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find({}).sort({ _id: -1 });
    res.send(tickets);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateTicketStatus = async (req, res) => {
  const allUser = await User.find({}).sort({ _id: -1 });

  if (req.body.status === true) {
    const updateTicketStatus = await Ticket.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: true,
        },
      }
    );

    const ticketAmount = await Ticket.findById(req.params.id);

    const updateUserWallet = await User.updateMany(
      {},
      {
        $inc: { wallet: ticketAmount.amount },
      },
      function (err, res) {
        if (err) throw err;
      }
    );
    res.send(updateUserWallet);
  } else {
    res.send("");
  }
};

module.exports = {
  addTicket,
  deleteTicket,
  getTicket,
  updateTicketStatus,
};
