import mongoose from "mongoose";

const demoBookingSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true }, // e.g. "10:00 AM"
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("DemoBooking", demoBookingSchema);