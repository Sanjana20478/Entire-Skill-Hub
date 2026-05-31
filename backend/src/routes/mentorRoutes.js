import express from "express";
import {
  answerQuestion,
  approveMentor,
  askQuestion,
  connectMentor,
  getMentorMe,
  getMentors,
  upsertMentorProfile
} from "../controllers/mentorController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMentors);
router.get("/me", protect, authorize("mentor", "admin"), getMentorMe);
router.post("/profile", protect, upsertMentorProfile);
router.patch("/:id/approve", protect, authorize("admin"), approveMentor);
router.post("/:id/connect", protect, authorize("user"), connectMentor);
router.post("/:id/questions", protect, authorize("user"), askQuestion);
router.patch("/questions/:questionId/answer", protect, authorize("mentor"), answerQuestion);

export default router;
