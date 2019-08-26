import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },
    ticket: {
      type: mongoose.Schema.Types,
      ref: "ticket",
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: true,
      required: true
    }
  },
  { timestamps: true }
);

export const Comment = mongoose.model("comment", commentSchema);
