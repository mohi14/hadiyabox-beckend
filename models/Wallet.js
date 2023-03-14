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
      required: true,
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
      required: true,
      default: null,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
      default: null,
    },

    description: {
      type: String,
      required: true,
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

    seller: {
      type: String,
      required: false,
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

const walletHistory = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    tag: [String],
    products: [productSchema],
  },
  {
    timestamps: true,
  }
);

const Wallet = mongoose.model("Wallet", walletHistory);
module.exports = Wallet;
