const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  getOrderByUser,
  updateOrder,
  deleteOrder,
  addOrderByUser,
  getAllWallet,
} = require("../controller/orderController");

//get all orders
router.get("/", getAllOrders);

//get all order by a user
router.get("/user/:id", getOrderByUser);

//get a order by id
router.get("/:id", getOrderById);

//update a order
router.put("/:id", updateOrder);

//delete a order
router.delete("/:id", deleteOrder);

// add a order
router.post("/add/:id", addOrderByUser);

// get wallet
router.get("/wallet/all", getAllWallet);

// TODO: add cart

module.exports = router;
