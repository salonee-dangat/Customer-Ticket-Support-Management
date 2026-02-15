const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

const {
  createTicket,
  addMessageToTicket,
} = require("../controllers/ticketController");

const { verifyToken, allowEmployeeOrUser } = require("../lib/authMiddleware");

// Create ticket
router.post("/", verifyToken, allowEmployeeOrUser, createTicket);

// Get user tickets
router.get("/", verifyToken, allowEmployeeOrUser, async (req, res) => {
  try {
    const { priority, status, search, category, page = 1, limit = 5 } = req.query;

    let filter = {
      createdBy: req.user.id,
    };

    if (priority) {
      filter.priority = priority;
    }

    if (status) {
      filter.status = status;
    }

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const tickets = await Ticket.find(filter)
  .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ tickets });

  } catch (err) {
    console.error("User ticket fetch error:", err);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
});
// ✅ Get single ticket by ID
router.get("/:id", verifyToken, allowEmployeeOrUser, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(ticket);

  } catch (err) {
    console.error("Fetch single ticket error:", err);
    res.status(500).json({ message: "Failed to fetch ticket" });
  }
});



// ✅ Add chat message
router.post("/:id/message", verifyToken, addMessageToTicket);
// ✅ Admin Ticket Analytics
router.get("/analytics", verifyToken, async (req, res) => {
  try {
    const { status, priority, startDate, endDate } = req.query;

    let filter = {};

    // If admin → see all tickets
    if (req.user.role !== "admin") {
      filter.createdBy = req.user.id;
    }

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const total = await Ticket.countDocuments(filter);
    const open = await Ticket.countDocuments({ ...filter, status: "open" });
    const inProgress = await Ticket.countDocuments({ ...filter, status: "in-progress" });
    const closed = await Ticket.countDocuments({ ...filter, status: "closed" });
    const highPriority = await Ticket.countDocuments({ ...filter, priority: "high" });

    res.json({
      total,
      open,
      inProgress,
      closed,
      highPriority,
    });

  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
});


module.exports = router;
