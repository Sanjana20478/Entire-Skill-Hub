import BusinessIdea from "../models/BusinessIdea.js";
import Feedback from "../models/Feedback.js";
import Mentor from "../models/Mentor.js";
import MentorSession from "../models/MentorSession.js";
import ProgressTracking from "../models/ProgressTracking.js";
import Resource from "../models/Resource.js";
import Roadmap from "../models/Roadmap.js";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getPlatformStats = asyncHandler(async (req, res) => {
  const [
    users,
    mentors,
    pendingMentors,
    ideas,
    resources,
    pendingResources,
    progressRecords,
    completedRoadmaps,
    feedback,
    sessions,
    completedSessions,
    averageFeedback
  ] =
    await Promise.all([
      User.countDocuments(),
      Mentor.countDocuments({ isApproved: true }),
      Mentor.countDocuments({ isApproved: false }),
      BusinessIdea.countDocuments(),
      Resource.countDocuments(),
      Resource.countDocuments({ isApproved: false }),
      ProgressTracking.countDocuments(),
      ProgressTracking.countDocuments({ percentComplete: 100 }),
      Feedback.countDocuments(),
      MentorSession.countDocuments(),
      MentorSession.countDocuments({ status: "completed" }),
      Feedback.aggregate([{ $group: { _id: null, average: { $avg: "$rating" } } }])
    ]);

  res.json({
    users,
    mentors,
    pendingMentors,
    ideas,
    roadmaps: await Roadmap.countDocuments(),
    resources,
    pendingResources,
    progressRecords,
    feedback,
    sessions,
    roadmapCompletionRate: progressRecords ? Math.round((completedRoadmaps / progressRecords) * 100) : 0,
    mentorInteractionRate: sessions ? Math.round((completedSessions / sessions) * 100) : 0,
    userSatisfactionScore: Number((averageFeedback[0]?.average || 0).toFixed(1))
  });
});
