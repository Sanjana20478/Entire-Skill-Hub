import BusinessIdea from "../models/BusinessIdea.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getIdeas = asyncHandler(async (req, res) => {
  const { search = "", category, difficulty } = req.query;
  const filter = {};

  if (search) filter.$text = { $search: search };
  if (category) filter.category = category;
  if (difficulty) filter.difficulty = difficulty;

  const ideas = await BusinessIdea.find(filter)
    .populate("matchingSkills matchingInterests")
    .sort("-createdAt");
  res.json(ideas);
});

export const getIdea = asyncHandler(async (req, res) => {
  const idea = await BusinessIdea.findById(req.params.id).populate("matchingSkills matchingInterests");
  if (!idea) {
    res.status(404);
    throw new Error("Business idea not found");
  }
  res.json(idea);
});

export const createIdea = asyncHandler(async (req, res) => {
  const idea = await BusinessIdea.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(idea);
});

export const updateIdea = asyncHandler(async (req, res) => {
  const idea = await BusinessIdea.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!idea) {
    res.status(404);
    throw new Error("Business idea not found");
  }
  res.json(idea);
});

export const deleteIdea = asyncHandler(async (req, res) => {
  const idea = await BusinessIdea.findByIdAndDelete(req.params.id);
  if (!idea) {
    res.status(404);
    throw new Error("Business idea not found");
  }
  res.json({ message: "Business idea deleted" });
});
