const express = require("express");
const router = express.Router();


const {createStudents,getStudents} = require("../controllers/studentsController");

router.post("/student", createStudents);  
router.get("/student",getStudents)
module.exports = router;