import express from "express";
import {
  createIdea,
  deleteIdea,
  getIdea,
  getIdeas,
  updateIdea
} from "../controllers/businessIdeaController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getIdeas);
router.get("/:id", protect, getIdea);
router.post("/", protect, authorize("admin"), createIdea);
router.put("/:id", protect, authorize("admin"), updateIdea);
router.delete("/:id", protect, authorize("admin"), deleteIdea);

export default router;
