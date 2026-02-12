const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Ticket = require("../models/Ticket");
const { verifyToken, allowAdmin } = require("../lib/authMiddleware");

// ---------------- ADMIN: GET ALL USERS ----------------
router.get("/users", verifyToken, allowAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ success: true, users });
  } catch (error) {
    console.error("Admin users error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// ---------------- ADMIN: DASHBOARD SUMMARY ----------------
router.get("/summary", verifyToken, allowAdmin, async (req, res) => {
  try {
    const totalTickets = await Ticket.countDocuments();
    const openTickets = await Ticket.countDocuments({ status: "Open" });
    const inProgressTickets = await Ticket.countDocuments({ status: "In Progress" });
    const closedTickets = await Ticket.countDocuments({ status: "Closed" });
    const totalUsers = await User.countDocuments();

    const statusDistribution = {
      Open: openTickets,
      "In Progress": inProgressTickets,
      Closed: closedTickets,
    };

    res.json({
      totalTickets,
      openTickets,
      inProgressTickets,
      closedTickets,
      totalUsers,
      statusDistribution,
    });
  } catch (err) {
    console.error("Admin dashboard summary error:", err);
    res.status(500).json({ message: "Failed to fetch admin summary" });
  }
});

// ---------------- ADMIN: GET ALL TICKETS ----------------
router.get("/tickets", verifyToken, allowAdmin, async (req, res) => {
  try {
    const { status, priority, category, sort } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;

    let query = Ticket.find(filter).populate("createdBy", "name email role");

    if (sort === "latest") query = query.sort({ createdAt: -1 });
    if (sort === "oldest") query = query.sort({ createdAt: 1 });

    const tickets = await query;

    res.json({ success: true, count: tickets.length, tickets });
  } catch (err) {
    console.error("Admin tickets error:", err);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
});

// ---------------- ADMIN: UPDATE TICKET STATUS ----------------
router.patch("/tickets/:id/status", verifyToken, allowAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatus = ["Open", "In Progress", "Resolved", "Closed"];
    if (!allowedStatus.includes(status)) return res.status(400).json({ message: "Invalid status value" });

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedTicket) return res.status(404).json({ message: "Ticket not found" });

    res.json({ success: true, ticket: updatedTicket });
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
});

// ---------------- ADMIN: UPDATE TICKET PRIORITY ----------------
router.patch("/tickets/:id/priority", verifyToken, allowAdmin, async (req, res) => {
  try {
    const { priority } = req.body;
    const allowedPriority = ["Low", "Medium", "High"];
    if (!allowedPriority.includes(priority)) return res.status(400).json({ message: "Invalid priority value" });

    const ticket = await Ticket.findByIdAndUpdate(req.params.id, { priority }, { new: true });
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    res.json({ success: true, ticket });
  } catch (err) {
    console.error("Priority update error:", err);
    res.status(500).json({ message: "Failed to update priority" });
  }
});

module.exports = router;