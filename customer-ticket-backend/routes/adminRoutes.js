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

router.get("/tickets", verifyToken, allowAdmin, async (req, res) => {
  try {
    const { status, priority, sort } = req.query;

    let filter = {};

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    let query = Ticket.find(filter).populate(
      "createdBy",
      "name email role"
    );

    if (sort === "latest") {
      query = query.sort({ createdAt: -1 });
    }

    if (sort === "oldest") {
      query = query.sort({ createdAt: 1 });
    }

    const tickets = await query;

    res.json({
      success: true,
      count: tickets.length,
      tickets,
    });
  } catch (err) {
    console.error("Admin tickets error:", err);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
});

// Update ticket status (ADMIN ONLY)
router.patch("/tickets/:id/status", verifyToken, async (req, res) => {
  try {
    // role check
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    const { status } = req.body;

    const allowedStatus = ["Open", "In Progress", "Resolved", "Closed"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({
      success: true,
      ticket: updatedTicket,
    });
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
});

// ADMIN: Update ticket priority
router.patch(
  "/tickets/:id/priority",
  verifyToken,
  allowAdmin,
  async (req, res) => {
    try {
      const { priority } = req.body;

      const allowedPriority = ["Low", "Medium", "High"];

      if (!allowedPriority.includes(priority)) {
        return res.status(400).json({ message: "Invalid priority value" });
      }

      const ticket = await Ticket.findByIdAndUpdate(
        req.params.id,
        { priority },
        { new: true }
      );

      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }

      res.json({ success: true, ticket });
    } catch (err) {
      res.status(500).json({ message: "Failed to update priority" });
    }
  }
);

module.exports = router;
