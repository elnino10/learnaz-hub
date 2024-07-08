const express = require("express");
const router = express.Router();
const { getAdminDashboard } = require("../controllers/adminController");

// Example route for admin dashboard
router.get("/dashboard", getAdminDashboard);

module.exports = router;
