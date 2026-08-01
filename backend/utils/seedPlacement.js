import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Job from "../models/Job.js";
import AlumniStory from "../models/AlumniStory.js";
import User from "../models/User.js";

const seed = async () => {
  await connectDB();

  const admin = await User.findOne({ role: "admin" });
  if (!admin) {
    console.log("No admin user found — make a user admin first.");
    return mongoose.connection.close();
  }

  await Job.deleteMany();
  await Job.create({
    title: "Junior Frontend Developer",
    company: "TechNova Pvt. Ltd.",
    location: "Kathmandu",
    type: "Full-time",
    description: "Looking for a React developer to join our product team.",
    requirements: ["React basics", "Tailwind CSS", "Git"],
    applicationDeadline: new Date("2026-09-01"),
    applyLink: "mailto:hr@technova.com",
    postedBy: admin._id,
  });

  await AlumniStory.deleteMany();
  await AlumniStory.create({
    name: "Sabin Adhikari",
    company: "Cloud Factory",
    position: "Software Engineer",
    story:
      "The MERN training here gave me the confidence and portfolio to land my first developer job within two months of completing the course.",
  });

  console.log("Placement data seeded");
  mongoose.connection.close();
};

seed();
