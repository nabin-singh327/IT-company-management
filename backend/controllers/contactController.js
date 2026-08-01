import ContactMessage from "../models/ContactMessage.js";

export const createContactMessage = async (req, res) => {
  try {
    const { name, email, purpose, message } = req.body;
    const contact = await ContactMessage.create({ name, email, purpose, message });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resolveContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { isResolved: true },
      { new: true }
    );
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};