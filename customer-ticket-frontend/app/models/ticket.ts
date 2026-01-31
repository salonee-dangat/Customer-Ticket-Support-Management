import mongoose, { Schema, models } from "mongoose";

const TicketSchema = new Schema(
  {
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in-progress", "closed"],
      default: "open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Ticket || mongoose.model("Ticket", TicketSchema);
