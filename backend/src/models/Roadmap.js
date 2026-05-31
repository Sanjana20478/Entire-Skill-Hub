import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    businessIdea: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessIdea", required: true },
    overview: { type: String, required: true },
    estimatedDuration: { type: String, default: "8 weeks" },
    phases: [
      {
        title: String,
        summary: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Roadmap", roadmapSchema);
