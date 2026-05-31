import mongoose from "mongoose";

const businessIdeaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    startupCost: { type: String, default: "Low" },
    difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    earningPotential: { type: String, default: "Moderate" },
    matchingSkills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    matchingInterests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Interest" }],
    tags: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

businessIdeaSchema.index({ title: "text", description: "text", category: "text", tags: "text" });

export default mongoose.model("BusinessIdea", businessIdeaSchema);
