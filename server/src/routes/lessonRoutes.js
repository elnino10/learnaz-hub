const express = require("express");
const router = express.Router();

// route to get lessons for a course
router.get("/:courseId/lessons", (req, res) => {
  res.send(`Lessons for course ${req.params.courseId} route`);
});

module.exports = router;
