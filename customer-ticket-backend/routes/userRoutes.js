const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { verifyToken } = require("../lib/authMiddleware");

// ✅ Get logged-in user info
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "name email role createdAt"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt, // ✅ FIX
});
  } catch (err) {
    console.error("Fetch user error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Existing /settings routes below
// GET /api/users/settings
// PUT /api/users/settings

/**
 * UPDATE USER SETTINGS
 * URL: /api/users/settings
 */
router.put("/settings", verifyToken, async (req, res) => {
  try {
    const { name } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name },
      { new: true }
    ).select("name email role");

    res.json({
      message: "Settings updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Settings update error:", error);
    res.status(500).json({ message: "Failed to update settings" });
  }
});

module.exports = router;
