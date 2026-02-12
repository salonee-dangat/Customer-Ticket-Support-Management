const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

const {
  verifyToken,
  allowEmployeeOrUser,
  allowAdmin,
} = require("../lib/authMiddleware");

/* ==============================
   CREATE TICKET
   POST /api/tickets
================================ */
router.post("/", verifyToken, allowEmployeeOrUser, async (req, res) => {
  try {
    const { title, description, priority, category } = req.body;

    if (!title || !description || !priority) {
      return res.status(400).json({
        success: false,
        message: "Title, description and priority are required",
      });
    }

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      category: category || "General",
      status: "Open",
      createdBy: req.user.id,
      messages: [],
    });

    res.status(201).json({ success: true, ticket });
  } catch (error) {
    console.error("CREATE TICKET ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create ticket",
    });
  }
});

/* ==============================
   GET MY TICKETS (USER / EMPLOYEE)
   GET /api/tickets/my
================================ */
router.get("/my", verifyToken, allowEmployeeOrUser, async (req, res) => {
  try {
    const tickets = await Ticket.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, tickets });
  } catch (error) {
    console.error("FETCH MY TICKETS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tickets",
    });
  }
});

/* ==============================
   GET SINGLE TICKET (CHAT VIEW)
   GET /api/tickets/:id
================================ */
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate(
      "messages.sender",
      "name email role"
    );

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }

    // 🔐 SECURITY CHECK
    if (
      req.user.role !== "admin" &&
      ticket.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({ success: true, ticket });
  } catch (error) {
    console.error("GET TICKET ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch ticket",
    });
  }
});

/* ==============================
   SEND MESSAGE (USER ↔ ADMIN)
   POST /api/tickets/:id/message
================================ */
router.post("/:id/message", verifyToken, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({ success: false, message: "Message text is required" });
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }

    // 🔐 Only creator OR admin can message
    if (
      req.user.role !== "admin" &&
      ticket.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    ticket.messages.push({
      sender: req.user.id,
      text,
    });

    await ticket.save();

    const updatedTicket = await Ticket.findById(req.params.id).populate(
      "messages.sender",
      "name email role"
    );

    res.status(200).json({
      success: true,
      ticket: updatedTicket,
    });
  } catch (error) {
    console.error("SEND MESSAGE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
});

module.exports = router;
