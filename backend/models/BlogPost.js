import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: "" },
    tags: [{ type: String }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("BlogPost", blogPostSchema);