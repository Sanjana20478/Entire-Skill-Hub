import mongoose from "mongoose";

const progressTrackingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    businessIdea: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessIdea", required: true },
    roadmap: { type: mongoose.Schema.Types.ObjectId, ref: "Roadmap", required: true },
    completedSteps: [{ type: mongoose.Schema.Types.ObjectId, ref: "RoadmapStep" }],
    currentStep: { type: mongoose.Schema.Types.ObjectId, ref: "RoadmapStep" },
    percentComplete: { type: Number, default: 0 },
    notes: String
  },
  { timestamps: true }
);

export default mongoose.model("ProgressTracking", progressTrackingSchema);
