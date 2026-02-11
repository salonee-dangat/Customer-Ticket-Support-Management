const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

// ✅ Activity Log Schema
const activitySchema = new mongoose.Schema(
  {
    action: String, // created, reply_added, status_changed
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

// ✅ Notification Schema
const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: String,
    isRead: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const ticketSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    priority: String,
    status: {
      type: String,
      default: "Open",
    },
    category: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [messageSchema],

    // ✅ NEW FIELDS
    activityLog: [activitySchema],
    notifications: [notificationSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
