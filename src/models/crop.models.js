import mongoose from "mongoose";

const cropSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

cropSchema.index(
  {
    name: 1
  },
  { unique: true }
);

export const Crop = mongoose.model("crop", cropSchema);
