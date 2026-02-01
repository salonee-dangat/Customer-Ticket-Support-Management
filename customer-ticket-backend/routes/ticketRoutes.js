const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const { verifyToken, allowEmployeeOrUser } = require("../lib/authMiddleware");

// Create ticket
router.post("/", verifyToken, allowEmployeeOrUser, async (req, res) => {
  try {
    const { title, description, priority, category } = req.body;
    if (!title || !description || !priority) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      category: category || "General",
      status: "Open",
      createdBy: req.user.id,
    });

    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create ticket" });
  }
});

// Get tickets for logged-in user
router.get("/", verifyToken, allowEmployeeOrUser, async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json({ tickets }); // ✅ always send object with "tickets"
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
});

module.exports = router;
