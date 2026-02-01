const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const { verifyToken, allowEmployeeOrUser } = require("../lib/authMiddleware");

// ✅ Create a ticket
router.post("/", verifyToken, allowEmployeeOrUser, async (req, res) => {
  console.log("🔥 CREATE TICKET API HIT");          // log API hit
  console.log("🔥 USER FROM TOKEN:", req.user);     // log JWT user
  console.log("🔥 REQUEST BODY:", req.body);       // log request data
console.log("🔥 Ticket creation request body:", req.body);
console.log("🔥 Logged-in user id:", req.user.id);

  try {
    const { title, description, priority } = req.body;

    if (!title || !description || !priority) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      status: "Open",
      createdBy: req.user.id, // ✅ must match schema
    });

    res.status(201).json(ticket);
  } catch (err) {
    console.error("Create ticket error:", err);
    res.status(500).json({ message: "Failed to create ticket" });
  }
});

// ✅ Get tickets for logged-in user (with pagination)
router.get("/", verifyToken, allowEmployeeOrUser, async (req, res) => {
  console.log("🔥 GET MY TICKETS API HIT");         // log API hit
  console.log("🔥 USER FROM TOKEN:", req.user);    // log JWT user

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const tickets = await Ticket.find({
      createdBy: req.user.id, // ✅ must match schema
    })
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
