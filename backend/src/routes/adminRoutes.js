import express from "express";
import { getPlatformStats } from "../controllers/adminController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", protect, authorize("admin"), getPlatformStats);

export default router;
