const Notification = require("../models/Notification");

const getAllNotification = async (req, res) => {
  const notification = await Notification.find({});

  if (notification.length === 0) {
    res.status(200).send({ message: "Notification list is empty.." });
    // throw new Error("Notification list is empty..");
    return;
  }
  res.json(notification);
};

const updateNotificationStatus = async (req, res) => {
  const notification = await Notification.findOne({ _id: req.params.id });
  if (notification.seen === false) {
    await Notification.updateOne(
      { _id: req.params.id },
      {
        $set: {
          seen: true,
        },
      }
    );
    res.status(200).send({
      message: "Notification Update successfully",
      status: 200,
    });
  } else {
    res.status(200).send({
      message: "Notification Update successfully",
      status: 200,
    });
  }
};

const deleteNotification = async (req, res) => {
  await Notification.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: "User notification Successfully!",
      });
    }
  });
};

module.exports = {
  getAllNotification,
  updateNotificationStatus,
  deleteNotification,
};
