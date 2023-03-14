const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    // url: {
    //   type: String,
    //   required: true,
    // },
    title: {
      type: String,
      require: true,
    },
    seen: {
      type: Boolean,
      required: false,
      default: false,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: false,
    },
    productName: {
      type: String,
      required: false,
    },
    productId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notificatin", notificationSchema);
module.exports = Notification;
