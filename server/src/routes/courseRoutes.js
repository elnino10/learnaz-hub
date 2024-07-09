const express = require("express");
const router = express.Router();
const { getCourses, createCourse } = require("../controllers/courseController");

// route to get all courses
router.get("/", getCourses);

// route to create a course
router.post("/", createCourse);

module.exports = router;
