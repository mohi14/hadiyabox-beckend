const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      required: false,
    },
    unit: {
      type: String,
      required: false,
    },
    parent: {
      type: String,
      required: false,
    },
    children: {
      type: String,
      required: false,
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
    },
    originalPrice: {
      type: Number,
      required: false,
    },
    price: {
      type: Number,
      required: true,
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
    },

    description: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    // tag: [String],
    // reviews: [reviewSchema],
    seller: {
      type: String,
      required: false,
    },

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

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
