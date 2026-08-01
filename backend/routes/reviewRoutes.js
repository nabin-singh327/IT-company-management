import express from "express";
import {
  getReviewsForCourse,
  createReview,
} from "../controllers/reviewController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/course/:courseId", getReviewsForCourse);
router.post("/", protect, authorize("student"), createReview);

export default router;
