const express = require("express");
const router = express.Router();
const { verifyToken } = require("../lib/auth");
const Ticket = require("../models/Ticket");

router.get("/tickets", verifyToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  const tickets = await Ticket.find().populate("userId");
  res.json(tickets);
});

module.exports = router;