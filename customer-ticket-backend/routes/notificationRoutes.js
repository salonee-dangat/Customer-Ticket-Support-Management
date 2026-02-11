const express = require("express");
const router = express.Router();
const { verifyToken } = require("../lib/authMiddleware");
const {
  getMyNotifications,
  markAsRead,
} = require("../controllers/notificationController");

router.get("/", verifyToken, getMyNotifications);
router.put("/:id/read", verifyToken, markAsRead);

module.exports = router;
