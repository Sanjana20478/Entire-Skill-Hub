import express from "express";
import {
  createResource,
  deleteResource,
  getResources,
  updateResource
} from "../controllers/resourceController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getResources);
router.post("/", protect, authorize("mentor", "admin"), createResource);
router.put("/:id", protect, authorize("mentor", "admin"), updateResource);
router.delete("/:id", protect, authorize("admin"), deleteResource);

export default router;
