import Mentor from "../models/Mentor.js";
import MentorSession from "../models/MentorSession.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const requestSession = asyncHandler(async (req, res) => {
  const mentor = await Mentor.findById(req.params.mentorId);
  if (!mentor || !mentor.isApproved) {
    res.status(404);
    throw new Error("Approved mentor not found");
  }

  const session = await MentorSession.create({
    mentor: mentor._id,
    mentee: req.user._id,
    topic: req.body.topic,
    preferredDate: req.body.preferredDate,
    mode: req.body.mode,
    notes: req.body.notes
  });

  if (!mentor.mentees.some((id) => id.toString() === req.user._id.toString())) {
    mentor.mentees.push(req.user._id);
    await mentor.save();
  }

  res.status(201).json(session);
});

export const getMySessions = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.user.role === "mentor") {
    const mentor = await Mentor.findOne({ user: req.user._id });
    filter.mentor = mentor?._id;
  } else if (req.user.role === "user") {
    filter.mentee = req.user._id;
  }

  const sessions = await MentorSession.find(filter)
    .populate({ path: "mentor", populate: { path: "user", select: "name email" } })
    .populate("mentee", "name email")
    .sort("-createdAt");

  res.json(sessions);
});

export const updateSessionStatus = asyncHandler(async (req, res) => {
  const session = await MentorSession.findById(req.params.id);
  if (!session) {
    res.status(404);
    throw new Error("Session not found");
  }

  if (req.user.role === "mentor") {
    const mentor = await Mentor.findOne({ user: req.user._id });
    if (session.mentor.toString() !== mentor?._id.toString()) {
      res.status(403);
      throw new Error("You can update only your own sessions");
    }
  }

  session.status = req.body.status;
  await session.save();
  res.json(session);
});
