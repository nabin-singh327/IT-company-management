import express from "express";
import { getAllUsers, updateUserRole, updateUserStatus } from "../controllers/userController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, authorize("admin"), getAllUsers);
router.patch("/:id/role", protect, authorize("admin"), updateUserRole);
router.patch("/:id/status", protect, authorize("admin"), updateUserStatus);

export default router;