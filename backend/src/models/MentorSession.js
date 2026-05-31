import mongoose from "mongoose";

const mentorSessionSchema = new mongoose.Schema(
  {
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor", required: true },
    mentee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    topic: { type: String, required: true },
    preferredDate: { type: Date, required: true },
    mode: { type: String, enum: ["Online", "Phone", "In-person"], default: "Online" },
    notes: String,
    status: {
      type: String,
      enum: ["requested", "accepted", "completed", "cancelled"],
      default: "requested"
    }
  },
  { timestamps: true }
);

export default mongoose.model("MentorSession", mentorSessionSchema);
