const User = require("../models/User");

// GET all users (ADMIN)
const getAllUsers = async (req, res) => {
  try {
    console.log("✅ Admin users API HIT");

    const users = await User.find().select("-password");

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });

  } catch (error) {
    console.error("❌ FETCH USERS ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

module.exports = { getAllUsers };
