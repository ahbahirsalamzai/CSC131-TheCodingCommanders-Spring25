// Backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {
  getTutorProfile,
  updateTutorProfile,
  updateTutorPassword
} = require("../controllers/userController");

// GET /api/users (already existing, KEEP THIS)
router.get("/", async (req, res) => {
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

// ADD THESE NEW ROUTES BELOW ⬇️
const { protect } = require("../middleware/authMiddleware");


// GET tutor profile (for /tutor-profile frontend)
router.get("/profile", protect, getTutorProfile);

// PUT update tutor personal info
router.put("/profile", protect, updateTutorProfile);

// PUT update tutor password
router.put("/profile/password", protect, updateTutorPassword);

module.exports = router;
