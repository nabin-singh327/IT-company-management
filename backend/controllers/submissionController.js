import Submission from "../models/Submission.js";
import Assignment from "../models/Assignment.js";

export const createSubmission = async (req, res) => {
  try {
    const { assignmentId, content } = req.body;

    const submission = await Submission.create({
      assignment: assignmentId,
      student: req.user.id,
      content,
    });
    res.status(201).json(submission);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "You've already submitted this assignment" });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getSubmissionsForAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.assignmentId);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    if (
      assignment.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const submissions = await Submission.find({
      assignment: req.params.assignmentId,
    }).populate("student", "name email");
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const gradeSubmission = async (req, res) => {
  try {
    const { grade, feedback } = req.body;

    const submission = await Submission.findById(req.params.id).populate(
      "assignment",
    );
    if (!submission)
      return res.status(404).json({ message: "Submission not found" });

    if (
      submission.assignment.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    submission.grade = grade;
    submission.feedback = feedback;
    submission.status = "graded";
    await submission.save();

    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
