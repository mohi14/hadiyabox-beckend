const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: false,
  },
  product_name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  // image: {
  //   type: String,
  //   required: true,
  // },
  // children: [{}],
  // status: {
  //   type: String,
  //   enum: ["Show", "Hide"],
  //   default: "Show",
  // },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
