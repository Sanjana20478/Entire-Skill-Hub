import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    businessIdea: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessIdea" },
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    status: { type: String, enum: ["new", "reviewed"], default: "new" }
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);
