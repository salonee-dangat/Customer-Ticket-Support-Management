const Ticket = require("../models/Ticket");

// Create Ticket
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
    });

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


// Add Message to Ticket
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

    ticket.messages.push({
      sender: req.user.id,
      text,
    });

    await ticket.save();

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

// Get all messages for a ticket
const getTicketMessages = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate("messages.sender", "name email"); // optional populate
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      messages: ticket.messages,
    });
  } catch (error) {
    console.error("FETCH MESSAGES ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};

module.exports = {
  createTicket,
  addMessageToTicket,
};