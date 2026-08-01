import Review from "../models/Review.js";
import Enrollment from "../models/Enrollment.js";

export const getReviewsForCourse = async (req, res) => {
  try {
    const reviews = await Review.find({ course: req.params.courseId })
      .populate("student", "name")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const { courseId, rating, comment } = req.body;

    const enrollment = await Enrollment.findOne({
      student: req.user.id,
      course: courseId,
      paymentStatus: "completed",
    });

    if (!enrollment) {
      return res
        .status(403)
        .json({ message: "You must be enrolled in this course to review it" });
    }

    const review = await Review.create({
      student: req.user.id,
      course: courseId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "You've already reviewed this course" });
    }
    res.status(500).json({ message: error.message });
  }
};
