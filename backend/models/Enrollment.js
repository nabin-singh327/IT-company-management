import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    amountPaid: { type: Number, required: true },
    transactionId: { type: String, required: true, unique: true }, 
    esewaRefId: { type: String }, 
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    progress: { type: Number, default: 0 }, 
  },
  { timestamps: true }
);

export default mongoose.model("Enrollment", enrollmentSchema);