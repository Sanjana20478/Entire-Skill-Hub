import BusinessIdea from "../models/BusinessIdea.js";
import Interest from "../models/Interest.js";
import Skill from "../models/Skill.js";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getProfileOptions = asyncHandler(async (req, res) => {
  const [skills, interests] = await Promise.all([
    Skill.find().sort("name"),
    Interest.find().sort("name")
  ]);
  res.json({ skills, interests });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const allowed = ["name", "phone", "location", "bio", "skills", "interests"];
  allowed.forEach((field) => {
    if (req.body[field] !== undefined) req.user[field] = req.body[field];
  });

  const saved = await req.user.save();
  const populated = await saved.populate("skills interests bookmarks");
  res.json(populated);
});

export const getRecommendations = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("skills interests");
  const skillIds = user.skills.map((skill) => skill._id.toString());
  const interestIds = user.interests.map((interest) => interest._id.toString());

  const ideas = await BusinessIdea.find()
    .populate("matchingSkills matchingInterests")
    .lean();

  const ranked = ideas
    .map((idea) => {
      const skillMatches = idea.matchingSkills.filter((skill) => skillIds.includes(skill._id.toString()));
      const interestMatches = idea.matchingInterests.filter((interest) =>
        interestIds.includes(interest._id.toString())
      );
      const score = skillMatches.length * 2 + interestMatches.length;

      return {
        ...idea,
        matchScore: score,
        matchReasons: [
          ...skillMatches.map((skill) => `Skill: ${skill.name}`),
          ...interestMatches.map((interest) => `Interest: ${interest.name}`)
        ]
      };
    })
    .filter((idea) => idea.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);

  res.json(ranked);
});

export const toggleBookmark = asyncHandler(async (req, res) => {
  const ideaId = req.params.ideaId;
  const exists = req.user.bookmarks.some((id) => id.toString() === ideaId);

  req.user.bookmarks = exists
    ? req.user.bookmarks.filter((id) => id.toString() !== ideaId)
    : [...req.user.bookmarks, ideaId];

  await req.user.save();
  const user = await User.findById(req.user._id).select("-password").populate("bookmarks");
  res.json({ bookmarks: user.bookmarks });
});

export const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").populate("skills interests").sort("-createdAt");
  res.json(users);
});

export const updateUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  user.isActive = req.body.isActive;
  await user.save();
  res.json({ message: "User status updated" });
});
