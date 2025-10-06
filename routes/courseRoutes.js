const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require("../controllers/courseController");


router.get("/", getCourses);
router.get("/:id", getCourseById);


router.post("/", auth, (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Access denied" });
  next();
}, createCourse);

router.put("/:id", auth, (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Access denied" });
  next();
}, updateCourse);

router.delete("/:id", auth, (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Access denied" });
  next();
}, deleteCourse);

module.exports = router;

