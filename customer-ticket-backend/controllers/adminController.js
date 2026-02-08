const User = require("../models/User");

// GET all users (ADMIN)
const getAllUsers = async (req, res) => {
  try {
    console.log("✅ Admin users API HIT");

    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("❌ FETCH USERS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

module.exports = { getAllUsers };
