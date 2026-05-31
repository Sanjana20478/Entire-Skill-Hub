import express from "express";
import { getMyProgress, startProgress, updateProgress } from "../controllers/progressController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, authorize("user", "mentor", "admin"), getMyProgress);
router.post("/", protect, authorize("user"), startProgress);
router.put("/:id", protect, authorize("user"), updateProgress);

export default router;
