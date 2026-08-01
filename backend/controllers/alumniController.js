import AlumniStory from "../models/AlumniStory.js";

export const getAlumniStories = async (req, res) => {
  try {
    const stories = await AlumniStory.find().populate("course", "title").sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAlumniStory = async (req, res) => {
  try {
    const story = await AlumniStory.create(req.body);
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};