import Feedback from "../models/Feedback.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.create({ ...req.body, user: req.user._id });
  res.status(201).json(feedback);
});

export const getFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.find()
    .populate("user", "name email")
    .populate("businessIdea", "title")
    .populate("mentor");
  res.json(feedback);
});

export const updateFeedbackStatus = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status || "reviewed" },
    { new: true, runValidators: true }
  );

  if (!feedback) {
    res.status(404);
    throw new Error("Feedback not found");
  }

  res.json(feedback);
});
