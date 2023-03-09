const WithDraw = require("../models/Withdraw");
const Admin = require("../models/Admin");

const addWithDraw = async (req, res) => {
  const { name, amount } = req.body;
  const user = await Admin.findById(req.params.id);
  console.log(user);
  try {
    if (user.wallet < amount || user.wallet === 0) {
      res.status(400).send({
        message: "You Dont Have Sufficient Balance",
        status: 400,
      });
    } else {
      const newWidthRaw = new WithDraw({
        name,
        amount,
        user: req.params.id,
      });
      await newWidthRaw.save();
      res.status(200).send({
        message: "WithDraw Request Added successfully",
        status: 200,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
      status: 500,
    });
  }
};

const getAllWithDraw = async (req, res) => {
  try {
    const withDraws = await WithDraw.find({}).sort({ _id: -1 });
    res.send(withDraws);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getWithDrawByUser = async (req, res) => {
  try {
    const userWithDraw = await WithDraw.find({ user: req.params.id });
    res.send(userWithDraw);
  } catch (err) {
    res.status(500).send({
      message: err.message,
      status: 500,
    });
  }
};

const updateWithDrawStatus = async (req, res) => {
  try {
    const withdraw = await WithDraw.findOne({ _id: req.params.id });
    if (withdraw.status === false) {
      const withDrawAmount = await WithDraw.findById(req.params.id);

      await WithDraw.updateOne(
        { _id: req.params.id },
        {
          $set: {
            status: true,
          },
        }
      );

      await Admin.updateOne(
        { _id: withDrawAmount.user },
        {
          $inc: { wallet: -withDrawAmount.amount },
        }
      );

      await Admin.updateOne(
        { role: "admin" },
        {
          $inc: { wallet: -withDrawAmount.amount },
        }
      );
      res.status(200).send({
        message: "Wallet Update successfully",
        status: 200,
      });
    } else {
      res.status(400).send({
        message: "This Ticket is already used.",
        status: 400,
      });
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const rejectWithdraw = async (req, res) => {
  try {
    const withdraw = await WithDraw.findOne({ _id: req.params.id });
    if (withdraw.rejected === false) {
      await WithDraw.updateOne(
        { _id: req.params.id },
        {
          $set: {
            rejected: true,
          },
        }
      );
      res.status(200).send({
        message: "Wallet Reject successfully",
        status: 200,
      });
    } else {
      res.status(400).send({
        message: "This Ticket is already used.",
        status: 400,
      });
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports = {
  addWithDraw,
  getAllWithDraw,
  getWithDrawByUser,
  updateWithDrawStatus,
  rejectWithdraw,
};
