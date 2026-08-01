import express from "express";

import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  initiateEnrollment,
  verifyEnrollment,
  getMyEnrollments,
  getEnrollmentById,
  getStudentsForCourse,
  updateProgress,
  getAllEnrollments,
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.post("/initiate", protect, initiateEnrollment);
router.get("/verify", verifyEnrollment);
router.get("/my", protect, getMyEnrollments);
router.get("/:id", protect, getEnrollmentById);
router.get(
  "/course/:courseId/students",
  protect,
  authorize("instructor", "admin"),
  getStudentsForCourse,
);
router.patch(
  "/:id/progress",
  protect,
  authorize("instructor", "admin"),
  updateProgress,
);
router.get("/admin/all", protect, authorize("admin"), getAllEnrollments);

export default router;
