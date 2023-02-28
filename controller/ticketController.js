const Ticket = require("../models/Ticket");

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

module.exports = {
  addTicket,
  deleteTicket,
  getTicket,
};
