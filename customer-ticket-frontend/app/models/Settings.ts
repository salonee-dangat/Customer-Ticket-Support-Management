import mongoose, { Schema, models } from "mongoose";

const SettingsSchema = new Schema(
  {
    appName: { type: String, default: "Customer Ticket Support" },
    supportEmail: { type: String, required: true },

    defaultPriority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    autoAssignTickets: { type: Boolean, default: false },

    slaHours: { type: Number, default: 24 },
    autoCloseDays: { type: Number, default: 7 },
    allowReopen: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Settings =
  models.Settings || mongoose.model("Settings", SettingsSchema);

export default Settings;
