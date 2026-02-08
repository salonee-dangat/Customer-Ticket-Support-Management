const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Ticket = require("../models/Ticket");
const { verifyToken, allowAdmin } = require("../lib/authMiddleware");

// ---------------- ADMIN: GET ALL USERS ----------------
router.get("/users", verifyToken, allowAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Admin users error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// ---------------- ADMIN: GET ALL TICKETS ----------------
router.get("/tickets", verifyToken, allowAdmin, async (req, res) => {
  try {
    const tickets = await Ticket.find().populate(
      "createdBy",
      "name email role"
    );

    res.json({
      success: true,
      tickets,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
});

module.exports = router;
