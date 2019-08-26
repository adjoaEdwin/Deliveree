import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ticket",
      required: true
    },
    answeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    }
  },
  { timestamps: true }
);

export const Answer = mongoose.model("answer", answerSchema);
