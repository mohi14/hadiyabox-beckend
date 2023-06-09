const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    blog: { type: String, required: true },
    image: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", reviewSchema);

module.exports = Blog;
