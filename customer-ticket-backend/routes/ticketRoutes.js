const express = require("express");
const router = express.Router();

const {
  createTicket,
  addMessageToTicket,
} = require("../controllers/ticketController");

const { verifyToken, allowEmployeeOrUser } = require("../lib/authMiddleware");
const Ticket = require("../models/Ticket");


// Create ticket
router.post("/", verifyToken, allowEmployeeOrUser, createTicket);


// Get tickets for logged-in user
router.get("/", verifyToken, allowEmployeeOrUser, async (req, res) => {
  try {
    const tickets = await Ticket.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tickets,
    });
  } catch (error) {
    console.error("FETCH TICKETS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tickets",
    });
  }
});

// Add message to ticket
router.post("/:id/message", verifyToken, addMessageToTicket);

module.exports = router;