const express = require("express");
const router = express.Router();
const { getLessons } = require("../controllers/lessonController");

// route to get lessons for a course
router.get("/:courseId/lessons", getLessons);

module.exports = router;
