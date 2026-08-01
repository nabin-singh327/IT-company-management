import Job from "../models/Job.js";

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createJob = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, postedBy: req.user.id });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};