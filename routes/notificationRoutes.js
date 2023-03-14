const express = require("express");
const router = express.Router();
const {
  getAllNotification,
  updateNotificationStatus,
  deleteNotification,
} = require("../controller/notificationController");

router.get("/", getAllNotification);
router.put("/seen/:id", updateNotificationStatus);
router.delete("/:id", deleteNotification);

module.exports = router;
