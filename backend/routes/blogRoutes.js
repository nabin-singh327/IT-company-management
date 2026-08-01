import express from "express";
import {
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
} from "../controllers/blogController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getBlogPosts);
router.get("/:slug", getBlogPostBySlug);
router.post("/", protect, authorize("instructor", "admin"), createBlogPost);

export default router;
