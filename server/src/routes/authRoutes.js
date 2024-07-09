const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/authController");

// route for login
router.post("/login", login);

// route for signup
router.post("/signup", signup);

module.exports = router;
