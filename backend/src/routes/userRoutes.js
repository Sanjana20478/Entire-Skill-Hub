import express from "express";
import {
  getProfileOptions,
  getRecommendations,
  listUsers,
  toggleBookmark,
  updateProfile,
  updateUserStatus
} from "../controllers/userController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile-options", protect, getProfileOptions);
router.put("/profile", protect, updateProfile);
router.get("/recommendations", protect, getRecommendations);
router.post("/bookmarks/:ideaId", protect, toggleBookmark);
router.get("/", protect, authorize("admin"), listUsers);
router.patch("/:id/status", protect, authorize("admin"), updateUserStatus);

export default router;
