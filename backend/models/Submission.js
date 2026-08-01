import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    grade: { type: Number, min: 0, max: 100 },
    feedback: { type: String },
    status: { type: String, enum: ["submitted", "graded"], default: "submitted" },
  },
  { timestamps: true }
);

submissionSchema.index({ assignment: 1, student: 1 }, { unique: true });

export default mongoose.model("Submission", submissionSchema);