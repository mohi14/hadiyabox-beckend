const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    sku: {
      type: String,
      required: false,
      default: null,
    },
    title: {
      type: String,
      required: false,
      default: null,
    },
    slug: {
      type: String,
      required: false,
      default: null,
    },
    unit: {
      type: String,
      required: false,
      default: null,
    },
    parent: {
      type: String,
      required: false,
      default: null,
    },
    children: {
      type: String,
      required: false,
      default: null,
    },
    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      required: false,
    },
    store: {
      type: String,
      required: false,
      default: null,
    },
    originalPrice: {
      type: Number,
      required: false,
      default: null,
    },
    price: {
      type: Number,
      required: false,
      default: 0,
    },
    discount: {
      type: Number,
      required: false,
      default: 0,
    },
    quantity: {
      type: Number,
      required: false,
      default: 0,
    },

    description: {
      type: String,
      required: false,
      default: null,
    },
    type: {
      type: String,
      required: false,
      default: null,
    },
    // tag: [String],
    // reviews: [reviewSchema],

    flashSale: {
      type: Boolean,
      required: false,
      default: false,
    },

    status: {
      type: String,
      default: "Show",
      enum: ["Show", "Hide"],
    },
  },

  {
    timestamps: true,
  }
);

const historySchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: false,
    },
    tag: [String],
    products: [productSchema],
  },
  {
    timestamps: true,
  }
);

const History = mongoose.model("History", historySchema);
module.exports = History;
