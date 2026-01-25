const Ticket = require("../models/Ticket");

// Create Ticket API
const createTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const newTicket = new Ticket({
      title,
      description,
      priority,
    });

    await newTicket.save();

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      data: newTicket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating ticket",
      error: error.message,
    });
  }
};

module.exports = {
  createTicket,
};
