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

module.exports = {
  addTicket,
};
