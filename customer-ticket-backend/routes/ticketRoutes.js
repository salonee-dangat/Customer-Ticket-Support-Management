const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const { verifyToken, allowEmployeeOrUser } = require("../lib/authMiddleware");


// Create ticket (employee/user)
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
      category,
      userId: req.user.id,
      status: "Open",
    });

    res.status(201).json(ticket);
  } catch (err) {
    console.error("Create ticket error:", err);
    res.status(500).json({ message: "Failed to create ticket" });
  }
});


// Employee: only their tickets
router.get("/my-tickets", verifyToken, async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
});


// Admin: all tickets with filters
router.get("/admin/all", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    const { status, priority, category } = req.query;

    let filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;

    const tickets = await Ticket.find(filter)
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
});

module.exports = router;