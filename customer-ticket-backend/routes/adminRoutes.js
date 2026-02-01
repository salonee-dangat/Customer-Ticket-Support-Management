const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const { verifyToken, allowAdmin } = require("../lib/authMiddleware");

// Get all tickets (admin)
router.get("/tickets", verifyToken, allowAdmin, async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("createdBy", "name email role");
    res.json({ tickets }); // ✅ return object with "tickets"
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
});

module.exports = router;
