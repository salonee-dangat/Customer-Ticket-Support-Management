const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket"); // Make sure Ticket model exists
const { verifyToken, allowEmployeeOrUser } = require("../lib/authMiddleware");

// ✅ Create a ticket
router.post("/", verifyToken, allowEmployeeOrUser, async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    if (!title || !description || !priority) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      userId: req.user.id, // comes from JWT cookie
      status: "Open",
    });

    res.status(201).json(ticket);
  } catch (err) {
    console.error("Create ticket error:", err);
    res.status(500).json({ message: "Failed to create ticket" });
  }
});

// ✅ Get tickets for logged-in user (with pagination)
router.get("/", verifyToken, allowEmployeeOrUser, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const tickets = await Ticket.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({ tickets });
  } catch (err) {
    console.error("Fetch tickets error:", err);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
});

module.exports = router;
