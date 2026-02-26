const Notification = require("../models/Notification");

// ✅ Get logged-in user's notifications
const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user.id,
    })
      .populate("sender", "name email role")
      .populate("ticket", "title status")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("GET NOTIFICATIONS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};

// ✅ Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        recipient: req.user.id,
      },
      { isRead: true }, // ✅ CORRECT FIELD
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.json({
      success: true,
      message: "Notification marked as read",
    });
  } catch (error) {
    console.error("MARK READ ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update notification",
    });
  }
};

module.exports = {
  getMyNotifications,
  markAsRead,
};