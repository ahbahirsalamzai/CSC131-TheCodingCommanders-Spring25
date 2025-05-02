import express from 'express';
import mongoose from 'mongoose';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  updatePersonalInfo,
  changePassword,
  getAllUsers,
  getMyProfile
} from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleAuth.js';

const router = express.Router();

// Get current admin's profile
router.get("/me",  authMiddleware, getMyProfile);

// Get all users (admin only)
router.get("/", authenticateToken, authorizeRoles('admin'), async (req, res) => {
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

// Update personal info (name, email, phone, DOB)
router.put("/update", authenticateToken,  updatePersonalInfo);

// Change password securely
router.put("/change-password", authenticateToken,  changePassword);

export default router;
