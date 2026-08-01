import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    purpose: {
      type: String,
      enum: ["Course Inquiry", "Technical Support", "Corporate Training", "Other"],
      default: "Other",
    },
    message: { type: String, required: true },
    isResolved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("ContactMessage", contactMessageSchema);