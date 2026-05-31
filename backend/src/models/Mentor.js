import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    expertise: [String],
    experienceYears: { type: Number, default: 0 },
    availability: { type: String, default: "Weekends" },
    linkedIn: String,
    isApproved: { type: Boolean, default: false },
    mentees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    questions: [
      {
        askedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        question: String,
        answer: String,
        status: { type: String, enum: ["open", "answered"], default: "open" }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Mentor", mentorSchema);
