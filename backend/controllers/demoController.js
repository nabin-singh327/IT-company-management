import DemoBooking from "../models/DemoBooking.js";
import Course from "../models/Course.js";

// POST /api/demo
export const createDemoBooking = async (req, res) => {
  try {
    const { courseId, name, email, phone, preferredDate, preferredTime } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const booking = await DemoBooking.create({
      course: courseId,
      name,
      email,
      phone,
      preferredDate,
      preferredTime,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};