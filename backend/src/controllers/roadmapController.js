import Roadmap from "../models/Roadmap.js";
import RoadmapStep from "../models/RoadmapStep.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getRoadmaps = asyncHandler(async (req, res) => {
  const filter = req.query.idea ? { businessIdea: req.query.idea } : {};
  const roadmaps = await Roadmap.find(filter).populate("businessIdea").sort("-createdAt");
  res.json(roadmaps);
});

export const getRoadmap = asyncHandler(async (req, res) => {
  const roadmap = await Roadmap.findById(req.params.id).populate("businessIdea");
  if (!roadmap) {
    res.status(404);
    throw new Error("Roadmap not found");
  }

  const steps = await RoadmapStep.find({ roadmap: roadmap._id }).sort("order");
  res.json({ ...roadmap.toObject(), steps });
});

export const createRoadmap = asyncHandler(async (req, res) => {
  const { steps = [], ...payload } = req.body;
  const roadmap = await Roadmap.create(payload);

  if (steps.length) {
    await RoadmapStep.insertMany(steps.map((step) => ({ ...step, roadmap: roadmap._id })));
  }

  const savedSteps = await RoadmapStep.find({ roadmap: roadmap._id }).sort("order");
  res.status(201).json({ ...roadmap.toObject(), steps: savedSteps });
});

export const updateRoadmap = asyncHandler(async (req, res) => {
  const roadmap = await Roadmap.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!roadmap) {
    res.status(404);
    throw new Error("Roadmap not found");
  }
  res.json(roadmap);
});

export const deleteRoadmap = asyncHandler(async (req, res) => {
  const roadmap = await Roadmap.findByIdAndDelete(req.params.id);
  if (!roadmap) {
    res.status(404);
    throw new Error("Roadmap not found");
  }
  await RoadmapStep.deleteMany({ roadmap: req.params.id });
  res.json({ message: "Roadmap deleted" });
});
