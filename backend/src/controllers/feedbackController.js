import Feedback from "../models/Feedback.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.create({ ...req.body, user: req.user._id });
  res.status(201).json(feedback);
});

export const getFeedback = asyncHandler(async (req, res) => {
  // Admin should see all feedback.
  if (req.user?.role === "admin") {
    const feedback = await Feedback.find()
      .populate("user", "name email")
      .populate("businessIdea", "title")
      .populate("mentor");
    return res.json(feedback);
  }

  // Learners/mentors should only see their own feedback.
  const feedback = await Feedback.find({ user: req.user._id })
    .populate("user", "name email")
    .populate("businessIdea", "title")
    .populate("mentor");

  return res.json(feedback);
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
