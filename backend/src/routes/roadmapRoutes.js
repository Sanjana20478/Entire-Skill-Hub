import express from "express";
import {
  createRoadmap,
  deleteRoadmap,
  getRoadmap,
  getRoadmaps,
  updateRoadmap
} from "../controllers/roadmapController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getRoadmaps);
router.get("/:id", protect, getRoadmap);
router.post("/", protect, authorize("admin"), createRoadmap);
router.put("/:id", protect, authorize("admin"), updateRoadmap);
router.delete("/:id", protect, authorize("admin"), deleteRoadmap);

export default router;
