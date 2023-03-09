const mongoose = require("mongoose");

const withdrawSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Admin",
    },
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      required: false,
      default: false,
    },
    rejected: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const WithDraw = mongoose.model("WithDraw", withdrawSchema);
module.exports = WithDraw;
