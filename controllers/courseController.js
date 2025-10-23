const Course = require("../models/course.js");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
 


const uploadDir = "./uploads";

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
 
const storage = multer.diskStorage({

  destination: (req, file, cb) => cb(null, uploadDir),

  filename: (req, file, cb) => {

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueSuffix + path.extname(file.originalname));

  },

});
 
const fileFilter = (req, file, cb) => {

  const allowed = /jpeg|jpg|png|gif/;

  const extname = allowed.test(path.extname(file.originalname).toLowerCase());

  const mimetype = allowed.test(file.mimetype);

  if (extname && mimetype) cb(null, true);

  else cb(new Error("Only image files are allowed!"));

};
 
const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
 

const createCourse = async (req, res) => {

  try {

    const { title, author, students, duration, level } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : "";
 
    const newCourse = await Course.create({ title, author, students, duration, level, image });

    res.status(201).json(newCourse);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};
 
const getCourses = async (req, res) => {

  try {

    const courses = await Course.find();

    res.status(200).json(courses);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};
 
const getCourseById = async (req, res) => {

  try {

    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};
 

const updateCourse = async (req, res) => {
  try {

    const { title, author, students, duration, level } = req.body;
 
    const updateData = { title, author, students, duration, level };
 
    if (req.file) {

      updateData.image = `/uploads/${req.file.filename}`;

    }
 
    const updatedCourse = await Course.findByIdAndUpdate(

      req.params.id,

      updateData,

      { new: true, runValidators: true }

    );
 
    if (!updatedCourse) return res.status(404).json({ message: "Course not found" });
 
    res.status(200).json(updatedCourse);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};
 


const deleteCourse = async (req, res) => {

  try {

    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json({ message: "Course deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};
 
module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  upload, 
};

 