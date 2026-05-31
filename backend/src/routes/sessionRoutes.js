import express from "express";
import {
  getMySessions,
  requestSession,
  updateSessionStatus
} from "../controllers/sessionController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMySessions);
router.post("/mentors/:mentorId", protect, authorize("user"), requestSession);
router.patch("/:id/status", protect, authorize("mentor", "admin"), updateSessionStatus);

export default router;
