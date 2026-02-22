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

    const userId = req.user.id;

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      category: category || "General",
      status: "Open",
      createdBy: userId,
      messages: [],
      activityLog: [
        {
          action: "created",
          performedBy: userId,
          message: "Ticket created",
        },
      ],
    });

    const admins = await User.find({ role: "admin" });

    for (let admin of admins) {
      await Notification.create({
        recipient: admin._id,
        sender: userId,
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



// ✅ GET SINGLE TICKET (VERY IMPORTANT FOR CHAT ALIGNMENT)
const getSingleTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("createdBy", "_id name role")
      .populate("messages.sender", "_id name role");

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json(ticket);

  } catch (error) {
    console.error("GET TICKET ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch ticket",
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

    const userId = req.user.id;

    const newMessage = {
      sender: userId,
      text,
      createdAt: new Date(),
    };

    ticket.messages.push(newMessage);

    ticket.activityLog.push({
      action: "reply_added",
      performedBy: userId,
      message: "New reply added",
    });

    await ticket.save();

    // 🔥 IMPORTANT: populate sender before sending back
    const updatedTicket = await Ticket.findById(ticket._id)
      .populate("messages.sender", "_id name role");

    const populatedMessage =
      updatedTicket.messages[updatedTicket.messages.length - 1];

    res.status(201).json(populatedMessage);

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
  getSingleTicket,
  addMessageToTicket,
};