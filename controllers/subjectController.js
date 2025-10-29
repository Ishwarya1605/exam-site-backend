const Subject = require("../models/subject");


const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ isDeleted: false });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject || subject.isDeleted)
      return res.status(404).json({ error: "Subject not found" });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const createSubject = async (req, res) => {
  try {
    const { name, author, students, duration, level, image } = req.body;

  
    let base64Image = image;
    if (req.file) {
      const imgBuffer = req.file.buffer;
      base64Image = `data:${req.file.mimetype};base64,${imgBuffer.toString("base64")}`;
    }

    const newSubject = new Subject({
      name,
      author,
      students,
      duration,
      level,
      image: base64Image,
    });

    const savedSubject = await newSubject.save();
    res.status(201).json(savedSubject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateSubject = async (req, res) => {
  try {
    const { name, author, students, duration, level, image } = req.body;
    let base64Image = image;

    if (req.file) {
      const imgBuffer = req.file.buffer;
      base64Image = `data:${req.file.mimetype};base64,${imgBuffer.toString("base64")}`;
    }

    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      { name, author, students, duration, level, image: base64Image },
      { new: true }
    );

    if (!updatedSubject)
      return res.status(404).json({ error: "Subject not found" });

    res.json(updatedSubject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!subject) return res.status(404).json({ error: "Subject not found" });

    res.json({ message: "Subject deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
};
