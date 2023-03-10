// const asyncHandler = require("express-async-handler");
// const products = require("../data/products");
const Product = require("../models/Product");
const Store = require("../models/storeModel");

// @desc Create new order
// @route POST /api/orders
// @access Private
const addStore = async (req, res) => {
  const { user, name, image, description, address } = req.body;
  console.log(req.body);
  const store = new Store({
    // owner: owner ? owner : req.user._id,
    // owner: "6341029b8e67f93114d8550a",
    name,
    image,
    description,
    address,
  });

  const createdStore = await store.save();
  res.status(201).json(createdStore);
};

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
const getStore = async (req, res) => {
  const store = await Store.find({});

  if (!store) {
    res.status(200);
    throw new Error("Order list is empty..");
  }
  res.json(store);
};

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getStoreById = async (req, res) => {
  const store = await Store.find({ userID: req.params.id });
  // console.log("Params: ", req.params.id);
  // const products = await Product.find({ store: `${req.params.id}` });
  // console.log("products: ", products);
  console.log(store);

  if (store) {
    res.send(store);
  } else {
    res.status(404);
  }
};

const addStoreBySeller = async (req, res) => {
  const { user, name, description, address } = req.body;
  // console.log(req.body);
  const store = new Store({
    userID: req.params.id,
    user,
    name,
    description,
    address,
  });

  const createdStore = await store.save();
  res.status(201).json(createdStore);
};

const deleteSingleStore = async (req, res) => {
  await Store.deleteOne({ _id: req.params.id });
  res.send({
    message: "Store Delete Succefully",
  });
};

module.exports = {
  addStore,
  getStore,
  getStoreById,
  addStoreBySeller,
  deleteSingleStore,
};
