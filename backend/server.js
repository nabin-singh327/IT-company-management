import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import courseRoutes from "./routes/courseRoutes.js";
import demoRoutes from "./routes/demoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import alumniRoutes from "./routes/alumniRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/courses", courseRoutes);
app.use("/api/demo", demoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/alumni", alumniRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "ITMS backend running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));