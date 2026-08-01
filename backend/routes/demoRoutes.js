import express from "express";
import { createDemoBooking } from "../controllers/demoController.js";

const router = express.Router();

router.post("/", createDemoBooking);

export default router;