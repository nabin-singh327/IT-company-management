import mongoose from "mongoose";

const alumniStorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    photo: { type: String, default: "" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    company: { type: String, required: true },
    position: { type: String, required: true },
    story: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("AlumniStory", alumniStorySchema);