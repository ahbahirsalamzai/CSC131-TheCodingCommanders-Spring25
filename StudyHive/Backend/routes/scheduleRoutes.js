import authenticateToken from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleAuth.js';

const express = require("express");
const router = express.Router();

// Example placeholder route
router.get("/", authenticateToken, (req, res) => {
  res.send("scheduleRoutes working!");
});

module.exports = router;
