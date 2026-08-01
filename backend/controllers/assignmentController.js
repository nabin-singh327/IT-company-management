import Assignment from "../models/Assignment.js";
import Course from "../models/Course.js";

export const createAssignment = async (req, res) => {
  try {
    const { courseId, title, description, dueDate } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (
      course.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized for this course" });
    }

    const assignment = await Assignment.create({
      course: courseId,
      title,
      description,
      dueDate,
      createdBy: req.user.id,
    });
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAssignmentsByCourse = async (req, res) => {
  try {
    const assignments = await Assignment.find({
      course: req.params.courseId,
    }).sort({ dueDate: 1 });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
