const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const { verifyToken, allowEmployeeOrUser } = require("../lib/authMiddleware");

// GET all tickets for logged-in user
router.get("/", verifyToken, allowEmployeeOrUser, async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, tickets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch tickets" });
  }
});

// GET single ticket by ID (needed for chat)
router.get("/:id", verifyToken, allowEmployeeOrUser, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate("messages.sender", "name email");
    if (!ticket) return res.status(404).json({ success: false, message: "Ticket not found" });
    res.status(200).json({ success: true, ticket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch ticket" });
  }
});

// POST message to ticket
router.post("/:id/message", verifyToken, allowEmployeeOrUser, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ success: false, message: "Message text is required" });

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ success: false, message: "Ticket not found" });

    ticket.messages.push({ sender: req.user.id, text });
    await ticket.save();

    // Return updated ticket with messages so frontend refreshes automatically
    const updatedTicket = await Ticket.findById(req.params.id).populate("messages.sender", "name email");
    res.status(200).json({ success: true, ticket: updatedTicket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

module.exports = router;