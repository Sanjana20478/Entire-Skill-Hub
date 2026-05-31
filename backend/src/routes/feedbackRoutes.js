import express from "express";
import {
  createFeedback,
  getFeedback,
  updateFeedbackStatus
} from "../controllers/feedbackController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createFeedback);
router.get("/", protect, authorize("admin"), getFeedback);
router.patch("/:id/status", protect, authorize("admin"), updateFeedbackStatus);

export default router;
