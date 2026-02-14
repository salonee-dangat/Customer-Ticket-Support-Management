const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Ticket = require("../models/Ticket");
const { verifyToken, allowAdmin } = require("../lib/authMiddleware");

// ✅ ADD THIS IMPORT (NEW – for chat feature)
const { addMessageToTicket } = require("../controllers/ticketController");



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
    const { priority, status, search, category } = req.query;

    let filter = {};

    // Priority filter
    if (priority) {
      filter.priority = priority;
    }

    // Status filter
    if (status) {
      filter.status = status;
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Search by title
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const tickets = await Ticket.find(filter).populate(
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


// ---------------- ADMIN: GET SETTINGS ----------------
router.get("/settings", verifyToken, allowAdmin, async (req, res) => {
  try {
    // Example settings
    const settings = {
      siteName: "SupportHub",
      contactEmail: "support@example.com",
      maxTicketLimit: 50,
    };

    res.json({ success: true, settings });
  } catch (err) {
    console.error("Admin settings error:", err);
    res.status(500).json({ message: "Failed to fetch settings" });
  }
});

// ---------------- ADMIN: UPDATE SETTINGS ----------------
router.post("/settings", verifyToken, allowAdmin, async (req, res) => {
  try {
    const { siteName, contactEmail, maxTicketLimit } = req.body;

    // For now, just return updated settings
    const updatedSettings = { siteName, contactEmail, maxTicketLimit };

    res.json({ success: true, settings: updatedSettings });
  } catch (err) {
    console.error("Update settings error:", err);
    res.status(500).json({ message: "Failed to update settings" });
  }
});

// =====================================================
// 🆕 ADMIN: ADD MESSAGE TO TICKET (CHAT FEATURE)
// =====================================================
router.post(
  "/tickets/:id/message",
  verifyToken,
  allowAdmin,
  addMessageToTicket
);


module.exports = router;
