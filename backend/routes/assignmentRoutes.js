import express from "express";
import { createAssignment, getAssignmentsByCourse } from "../controllers/assignmentController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("instructor", "admin"), createAssignment);
router.get("/course/:courseId", protect, getAssignmentsByCourse);

export default router;