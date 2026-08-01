import express from "express";
import {
  createContactMessage,
  getContactMessages,
  resolveContactMessage,
} from "../controllers/contactController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createContactMessage);
router.get("/", protect, authorize("admin"), getContactMessages);
router.patch("/:id/resolve", protect, authorize("admin"), resolveContactMessage);

export default router;