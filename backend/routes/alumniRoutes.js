import express from "express";
import { getAlumniStories, createAlumniStory } from "../controllers/alumniController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAlumniStories);
router.post("/", protect, authorize("admin"), createAlumniStory);

export default router;