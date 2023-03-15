const History = require("../models/History");
const Order = require("../models/Order");
const { findOne } = require("../models/User");
const User = require("../models/User");
const Wallet = require("../models/Wallet");
const Admin = require("../models/Admin");
const Notificatin = require("../models/Notification");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your_email_address@gmail.com",
    pass: "your_email_password",
  },
});

const email = "mohi.opediatech@gmail.com";

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
  const newhistory = new History({
    products: [req.body],
    user: req.params.id,
    // userId: req.params.id,
  });

  const newWallet = new Wallet({ products: [req.body] });
  const user = await Admin.findOne({ _id: req.params.id });

  const admin = await Admin.findOne({ role: "admin" });
  const seller = await Admin.findOne({ name: req.body.seller });

  // console.log(newhistory);

  // wallet create hobe , user amount kombe, history add hbe

  const newNotification = new Notificatin({
    title: "Order",
    amount: orderAmount,
    userName: user?.name,
    userId: req.params.id,
    productName: req.body.title,
    productId: req.body._id,
  });

  try {
    if (user.wallet >= orderAmount) {
      await Admin.updateOne(
        { _id: req.params.id },
        {
          $inc: { wallet: -orderAmount },
        }
      );
      await newhistory.save();
      await newWallet.save();
      await newNotification.save();

      // await newWallet.insertOne(req.body);
      // await newhistory.save();
      // await newWallet.save();

      // email send start
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mohisilva1@gmail.com",
          pass: "peqprjkgjiikugvk",
        },
      });

      const mailOptions = {
        from: "mohisilva1@gmail.com",
        to: [admin.email, seller.email],
        subject: "Order Purchased",
        html: `<h2>Yahooooo!</h2>
              <p>${user.name} purchased ${req.body.title} from ${req.body.store}</p>
            `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error(error);
          res.send("Error sending email");
        } else {
          console.log("Email sent: " + info.response);
          res.send("Email sent successfully");
        }
      });

      // email send END

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
