import ProgressTracking from "../models/ProgressTracking.js";
import RoadmapStep from "../models/RoadmapStep.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getMyProgress = asyncHandler(async (req, res) => {
  const progress = await ProgressTracking.find({ user: req.user._id })
    .populate("businessIdea roadmap currentStep completedSteps")
    .sort("-updatedAt");
  res.json(progress);
});

export const startProgress = asyncHandler(async (req, res) => {
  const { businessIdea, roadmap } = req.body;
  const firstStep = await RoadmapStep.findOne({ roadmap }).sort("order");
  const progress = await ProgressTracking.findOneAndUpdate(
    { user: req.user._id, roadmap },
    { businessIdea, roadmap, currentStep: firstStep?._id },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  res.status(201).json(progress);
});

export const updateProgress = asyncHandler(async (req, res) => {
  const progress = await ProgressTracking.findOne({ _id: req.params.id, user: req.user._id });
  if (!progress) {
    res.status(404);
    throw new Error("Progress record not found");
  }

  progress.completedSteps = req.body.completedSteps ?? progress.completedSteps;
  progress.notes = req.body.notes ?? progress.notes;

  const totalSteps = await RoadmapStep.countDocuments({ roadmap: progress.roadmap });
  progress.percentComplete = totalSteps
    ? Math.round((progress.completedSteps.length / totalSteps) * 100)
    : 0;

  const nextStep = await RoadmapStep.findOne({
    roadmap: progress.roadmap,
    _id: { $nin: progress.completedSteps }
  }).sort("order");
  progress.currentStep = nextStep?._id;

  await progress.save();
  res.json(progress);
});
