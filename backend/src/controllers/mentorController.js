import Mentor from "../models/Mentor.js";
import Resource from "../models/Resource.js";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getMentors = asyncHandler(async (req, res) => {
  const filter = req.user?.role === "admin" ? {} : { isApproved: true };
  const mentors = await Mentor.find(filter).populate("user", "name email location bio").sort("-createdAt");
  res.json(mentors);
});

export const getMentorMe = asyncHandler(async (req, res) => {
  const mentor = await Mentor.findOne({ user: req.user._id })
    .populate("user", "name email location bio")
    .populate("mentees", "name email")
    .populate("questions.askedBy", "name");

  if (!mentor) {
    res.status(404);
    throw new Error("Mentor profile not found");
  }

  const resources = await Resource.find({ uploadedBy: req.user._id });
  res.json({ mentor, resources });
});

export const upsertMentorProfile = asyncHandler(async (req, res) => {
  let mentor = await Mentor.findOne({ user: req.user._id });
  if (!mentor) {
    mentor = await Mentor.create({ user: req.user._id, ...req.body });
    req.user.role = "mentor";
    await req.user.save();
  } else {
    Object.assign(mentor, req.body);
    await mentor.save();
  }
  res.json(mentor);
});

export const approveMentor = asyncHandler(async (req, res) => {
  const mentor = await Mentor.findById(req.params.id);
  if (!mentor) {
    res.status(404);
    throw new Error("Mentor not found");
  }
  mentor.isApproved = req.body.isApproved;
  await mentor.save();
  res.json({ message: "Mentor approval updated" });
});

export const connectMentor = asyncHandler(async (req, res) => {
  const mentor = await Mentor.findById(req.params.id);
  if (!mentor) {
    res.status(404);
    throw new Error("Mentor not found");
  }
  if (!mentor.mentees.some((id) => id.toString() === req.user._id.toString())) {
    mentor.mentees.push(req.user._id);
    await mentor.save();
  }
  res.json({ message: "Mentor connection saved" });
});

export const askQuestion = asyncHandler(async (req, res) => {
  const mentor = await Mentor.findById(req.params.id);
  if (!mentor) {
    res.status(404);
    throw new Error("Mentor not found");
  }
  mentor.questions.push({ askedBy: req.user._id, question: req.body.question });
  await mentor.save();
  res.status(201).json({ message: "Question submitted" });
});

export const answerQuestion = asyncHandler(async (req, res) => {
  const mentor = await Mentor.findOne({ user: req.user._id });
  if (!mentor) {
    res.status(404);
    throw new Error("Mentor profile not found");
  }

  const question = mentor.questions.id(req.params.questionId);
  if (!question) {
    res.status(404);
    throw new Error("Question not found");
  }

  question.answer = req.body.answer;
  question.status = "answered";
  await mentor.save();
  res.json({ message: "Answer saved" });
});
