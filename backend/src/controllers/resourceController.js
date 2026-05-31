import Resource from "../models/Resource.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getResources = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.idea) filter.relatedIdea = req.query.idea;
  if (req.user?.role !== "admin") filter.isApproved = true;

  const resources = await Resource.find(filter).populate("relatedIdea uploadedBy", "title name");
  res.json(resources);
});

export const createResource = asyncHandler(async (req, res) => {
  const resource = await Resource.create({
    ...req.body,
    uploadedBy: req.user._id,
    isApproved: req.user.role === "admin"
  });
  res.status(201).json(resource);
});

export const updateResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!resource) {
    res.status(404);
    throw new Error("Resource not found");
  }
  res.json(resource);
});

export const deleteResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findByIdAndDelete(req.params.id);
  if (!resource) {
    res.status(404);
    throw new Error("Resource not found");
  }
  res.json({ message: "Resource deleted" });
});
