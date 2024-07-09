const express = require("express");
const router = express.Router();

// route to get user profile
router.get("/profile", (req, res) => {
  res.send("User profile route");
});

module.exports = router;
