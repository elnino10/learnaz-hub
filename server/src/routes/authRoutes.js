const express = require("express");
const router = express.Router();

// route for login
router.post("/login", (req, res) => {
  res.send("Login route");
});

// route for signup
router.post("/signup", (req, res) => {
  res.send("Signup route");
});

module.exports = router;
