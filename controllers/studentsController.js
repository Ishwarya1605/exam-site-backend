const Student = require("../models/studentsModels");
const bcrypt = require("bcryptjs");
exports.createStudents = async (req, res) => {
  try {
    const students = req.body; 
    if (!Array.isArray(students) || students.length === 0)
      return res.status(400).json({ message: "Students array required" });

    const newStudents = await Student.insertMany(students);
    res.status(201).json(newStudents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getStudents = async (req, res) => {
  try {
    const showAll = req.query.all === "true";
    const students = showAll
      ? await Student.find()
      : await Student.find({ isDeleted: false });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};