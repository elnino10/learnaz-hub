const express = require("express");
const router = express.Router();
const { getUserProfile } = require("../controllers/userController");

// route to get user profile
router.get("/profile", getUserProfile);

module.exports = router;
