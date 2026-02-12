const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { verifyToken } = require("../lib/authMiddleware");

// ✅ Get logged-in user info
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email phone role createdAt");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
});

// ✅ Existing /settings routes below
// GET /api/users/settings
// PUT /api/users/settings
// Profile update
router.put("/me", verifyToken, async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, phone },
      { new: true }
    ).select("name email phone role createdAt");

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ success: false, message: "Profile update failed" });
  }
});


module.exports = router;
