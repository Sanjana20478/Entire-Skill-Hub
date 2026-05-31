import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    category: { type: String, default: "General" }
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);
