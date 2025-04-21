// Backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// GET /api/users
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

module.exports = router;
