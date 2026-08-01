import express from "express";
import {
  getFeaturedCourses,
  getCourses,
  getCourseBySlug,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getMyCourses,
  getAllCoursesAdmin,
} from "../controllers/courseController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/featured", getFeaturedCourses);
router.get("/instructor/mine", protect, authorize("instructor", "admin"), getMyCourses);
router.get("/id/:id", protect, authorize("instructor", "admin"), getCourseById);
router.get("/admin/all", protect, authorize("admin"), getAllCoursesAdmin);
router.get("/:slug", getCourseBySlug);
router.get("/", getCourses);

router.post("/", protect, authorize("instructor", "admin"), createCourse);
router.put("/:id", protect, authorize("instructor", "admin"), updateCourse);
router.delete("/:id", protect, authorize("instructor", "admin"), deleteCourse);

export default router;