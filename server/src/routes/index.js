const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const courseRoutes = require("./courseRoutes");
const lessonRoutes = require("./lessonRoutes");
const adminRoutes = require("./adminRoutes");
const tutorRoutes = require("./tutorRoutes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/courses", courseRoutes);
router.use("/lessons", lessonRoutes);
router.use("/admin", adminRoutes);
router.use("/tutors", tutorRoutes); // Add tutor routes here

module.exports = router;
