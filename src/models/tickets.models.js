import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ["open", "closed"],
      default: "open"
    },
    isAnswered: {
      type: String
    },
    openedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    }
  },
  { timestamps: true }
);

export const Ticket = mongoose.model("ticket", ticketSchema);
