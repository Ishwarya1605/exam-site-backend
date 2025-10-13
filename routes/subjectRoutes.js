const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
} = require("../controllers/subjectController");


router.get("/", getSubjects);
router.get("/:id", getSubjectById);


router.post("/", auth, (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Access denied" });
  next();
}, createSubject);

router.put("/:id", auth, (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Access denied" });
  next();
}, updateSubject);

router.delete("/:id", auth, (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Access denied" });
  next();
}, deleteSubject);

module.exports = router;
