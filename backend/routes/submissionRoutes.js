import express from "express";
import {
  createSubmission,
  getSubmissionsForAssignment,
  gradeSubmission,
} from "../controllers/submissionController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("student"), createSubmission);
router.get(
  "/assignment/:assignmentId",
  protect,
  authorize("instructor", "admin"),
  getSubmissionsForAssignment
);
router.patch("/:id/grade", protect, authorize("instructor", "admin"), gradeSubmission);

export default router;