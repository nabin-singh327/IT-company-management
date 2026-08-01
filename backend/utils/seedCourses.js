import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Course from "../models/Course.js";

const courses = [
  {
    title: "Python for Beginners",
    slug: "python-for-beginners",
    description: "Learn Python from scratch with hands-on projects.",
    category: "Programming",
    skillLevel: "Beginner",
    duration: "8 weeks",
    fee: 8000,
    syllabus: ["Basics", "Data Structures", "OOP", "Mini Project"],
    instructor: { name: "Ramesh Shrestha", bio: "5+ yrs teaching Python", experience: "5 years" },
    isFeatured: true,
     enrollmentCount: 200,
  },
  {
    title: "React JS Web Development",
    slug: "react-js-web-development",
    description: "Build modern web apps with React and Tailwind.",
    category: "Web Development",
    skillLevel: "Intermediate",
    duration: "10 weeks",
    fee: 12000,
    syllabus: ["JSX", "Hooks", "Routing", "State Management", "Deployment"],
    instructor: { name: "Sujata Karki", bio: "Frontend engineer", experience: "4 years" },
    isFeatured: true,
     enrollmentCount: 310,
  },
  {
    title: "Graphic Design with Photoshop & Illustrator",
    slug: "graphic-design-photoshop-illustrator",
    description: "Master industry-standard design tools for branding and print.",
    category: "Graphic Design",
    skillLevel: "Beginner",
    duration: "6 weeks",
    fee: 7000,
    syllabus: ["Photoshop Basics", "Illustrator Basics", "Branding Project"],
    instructor: { name: "Anjali Gurung", bio: "Freelance designer, 6+ yrs", experience: "6 years" },
    isFeatured: true,
    enrollmentCount: 120,
  },
  {
    title: "Data Science & Analytics Bootcamp",
    slug: "data-science-analytics-bootcamp",
    description: "From Excel to Python-based data analysis and visualization.",
    category: "Data Science",
    skillLevel: "Advanced",
    duration: "12 weeks",
    fee: 18000,
    syllabus: ["Excel", "Python/Pandas", "SQL", "Visualization", "Capstone"],
    instructor: { name: "Bikash Thapa", bio: "Data analyst turned instructor", experience: "7 years" },
    isFeatured: false,
    enrollmentCount: 45,
  },
];

const seed = async () => {
  await connectDB();
  await Course.deleteMany();
  await Course.insertMany(courses);
  console.log("Courses seeded");
  mongoose.connection.close();
};

seed();