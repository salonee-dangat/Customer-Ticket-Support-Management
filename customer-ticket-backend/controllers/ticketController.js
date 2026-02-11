const Ticket = require("../models/Ticket");
const User = require("../models/User");
const Notification = require("../models/Notification");

// ✅ Create Ticket
const createTicket = async (req, res) => {
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
      activityLog: [
        {
          action: "created",
          performedBy: req.user.id,
          message: "Ticket created",
        },
      ],
    });

    // ✅ Notify all admins
    const admins = await User.find({ role: "admin" });

    for (let admin of admins) {
      await Notification.create({
        recipient: admin._id,
        sender: req.user.id,
        ticket: ticket._id,
        message: "New ticket has been created",
      });
    }

    res.status(201).json({
      success: true,
      ticket,
    });
  } catch (error) {
    console.error("CREATE TICKET ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create ticket",
    });
  }
};

// ✅ Add Message to Ticket
const addMessageToTicket = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Message text is required",
      });
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    // ✅ Add message
    ticket.messages.push({
      sender: req.user.id,
      text,
    });

    // ✅ Add activity log
    ticket.activityLog.push({
      action: "reply_added",
      performedBy: req.user.id,
      message: "New reply added",
    });

    await ticket.save();

    // ✅ Notification logic
    if (req.user.role === "admin") {
      // Notify ticket creator
      await Notification.create({
        recipient: ticket.createdBy,
        sender: req.user.id,
        ticket: ticket._id,
        message: "Admin replied to your ticket",
      });
    } else {
      // Notify all admins
      const admins = await User.find({ role: "admin" });

      for (let admin of admins) {
        await Notification.create({
          recipient: admin._id,
          sender: req.user.id,
          ticket: ticket._id,
          message: "User replied to a ticket",
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "Message added successfully",
    });
  } catch (error) {
    console.error("ADD MESSAGE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

module.exports = {
  createTicket,
  addMessageToTicket,
};
