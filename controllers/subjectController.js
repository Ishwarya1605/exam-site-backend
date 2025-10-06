const subject = require("../models/subject");


const getSubject = async (req, res) => {
  try {
    const courses = await Subject.find();
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ error: "Subject not found" });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const createSubject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const subject = new Subject({ name, description });
    await subject.save();
    res.status(201).json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateSubject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!subject) return res.status(404).json({ error: "Subject not found" });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) return res.status(404).json({ error: "Subject not found" });
    res.json({ message: "Subject deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getSubject,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
};
