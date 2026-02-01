const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    preferences: {
      emailNotifications: { type: Boolean, default: true },
      ticketUpdates: { type: Boolean, default: true },
      systemAlerts: { type: Boolean, default: true },
      theme: { type: String, default: "light" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
