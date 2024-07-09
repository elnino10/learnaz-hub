const express = require("express");
const router = express.Router();

// route to get all courses
router.get("/", (req, res) => {
  res.send("All courses route");
});

// route to create a course
router.post("/", (req, res) => {
  res.send("Create course route");
});

module.exports = router;
