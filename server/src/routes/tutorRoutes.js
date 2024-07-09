const express = require("express");
const router = express.Router();
const { getTutorProfile, createTutorProfile, updateTutorProfile, deleteTutorProfile } = require("../controllers/tutorController");

// route to get tutor profile
router.get("/:tutorId", getTutorProfile);

// route to create tutor profile
router.post("/", createTutorProfile);

// route to update tutor profile
router.put("/:tutorId", updateTutorProfile);

// route to delete tutor profile
router.delete("/:tutorId", deleteTutorProfile);

module.exports = router;
