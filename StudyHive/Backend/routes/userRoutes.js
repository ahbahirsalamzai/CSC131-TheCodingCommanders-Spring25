// Backend/routes/userRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { getAllUsers } = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleAuth');






// GET /api/users
router.get("/", authorizeRoles('admin') ,async (req, res) => {  // Middleware to check if the user is an admin
  // This route is protected and requires authentication
  try {
    const users = await mongoose.connection.db
      .collection("users")
      .find()
      .toArray();
    res.json({
      database: mongoose.connection.db.databaseName,
      collection: "users",
      count: users.length,
      users,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
