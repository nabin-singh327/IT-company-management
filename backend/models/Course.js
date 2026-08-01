import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Programming",
        "Web Development",
        "Data Science",
        "Graphic Design",
      ],
    },
    skillLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    duration: { type: String, required: true }, // e.g. "8 weeks"
    fee: { type: Number, required: true },
    thumbnail: { type: String, default: "" }, // Cloudinary URL later
    syllabus: [{ type: String }],
    prerequisites: { type: String, default: "None" },
    instructor: {
      name: { type: String, required: true },
      bio: { type: String },
      photo: { type: String, default: "" },
      experience: { type: String },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    enrollmentDeadline: { type: Date },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    enrollmentCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("Course", courseSchema);
