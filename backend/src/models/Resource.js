import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    type: { type: String, enum: ["Video", "Article", "Template", "Course", "Checklist"], default: "Article" },
    url: { type: String, required: true },
    category: String,
    relatedIdea: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessIdea" },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isApproved: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Resource", resourceSchema);
