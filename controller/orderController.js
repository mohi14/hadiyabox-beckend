const History = require("../models/History");
const Order = require("../models/Order");
const { findOne } = require("../models/User");
const User = require("../models/User");
const Wallet = require("../models/Wallet");
const Admin = require("../models/Admin");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ _id: -1 });
    res.send(orders);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getOrderByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id }).sort({ _id: -1 });
    res.send(orders);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.send(order);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateOrder = (req, res) => {
  const newStatus = req.body.status;
  Order.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        status: newStatus,
      },
    },
    (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: "Order Updated Successfully!",
        });
      }
    }
  );
};

const deleteOrder = (req, res) => {
  Order.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: "Order Deleted Successfully!",
      });
    }
  });
};

const getAllWallet = async (req, res) => {
  const wallets = await Wallet.find({}).sort({ _id: -1 });
  // console.log("wallet");
  try {
    const wallet = await Wallet.find({}).sort({ _id: -1 });
    res.send(wallet);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const addOrderByUser = async (req, res) => {
  const orderAmount = parseInt(req.body.price);

  const user = await Admin.findOne({ _id: req.params.id });

  // console.log(req.body);

  try {
    if (user.wallet >= orderAmount) {
      await User.updateOne(
        { _id: req.params.id },
        {
          $inc: { wallet: -orderAmount },
        }
      );
      await History.insertOne(req.body);
      await Wallet.insertOne(req.body);
      res.status(200).send({
        message: "Order Added Successfully",
        status: 200,
      });
    } else if (user.wallet === 0 || user.wallet < orderAmount) {
      res.status(400).send({
        message: "You dont have sufficient balance in your wallet",
        status: 400,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
      status: 500,
    });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  getOrderByUser,
  updateOrder,
  deleteOrder,
  addOrderByUser,
  getAllWallet,
};
