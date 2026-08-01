import express from "express";
import { getJobs, createJob, deleteJob } from "../controllers/jobController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getJobs);
router.post("/", protect, authorize("admin"), createJob);
router.delete("/:id", protect, authorize("admin"), deleteJob);

export default router;