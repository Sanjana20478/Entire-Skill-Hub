import mongoose from "mongoose";

const roadmapStepSchema = new mongoose.Schema(
  {
    roadmap: { type: mongoose.Schema.Types.ObjectId, ref: "Roadmap", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, required: true },
    type: {
      type: String,
      enum: [
        "Idea validation",
        "Required tools",
        "Required skills",
        "Cost estimation",
        "Legal registration",
        "Marketing basics",
        "Growth tips"
      ],
      required: true
    },
    tasks: [String]
  },
  { timestamps: true }
);

export default mongoose.model("RoadmapStep", roadmapStepSchema);
