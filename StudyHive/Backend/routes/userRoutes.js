import express from 'express';
import mongoose from 'mongoose';
import { updatePersonalInfo, changePassword, getAllUsers, getMyProfile } from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleAuth.js';
import { validatePersonalInfoUpdate, validatePasswordChange } from '../middleware/validationMiddleware.js';

const router = express.Router();

// ==============================
// Route: GET /api/users/me
// Purpose: Get current admin's profile information
// ==============================
router.get("/me", authenticateToken, getMyProfile);

// ==============================
// Route: GET /api/users
// Purpose: Get all users (Admin Only)
// ==============================
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

// ==============================
// Route: PUT /api/users/update
// Purpose: Update personal info (name, email, phone, DOB)
// ==============================
router.put("/update", authenticateToken, validatePersonalInfoUpdate, updatePersonalInfo);

// ==============================
// Route: PUT /api/users/change-password
// Purpose: Allow admin to change password securely
// ==============================
router.put("/change-password", authenticateToken, validatePasswordChange, changePassword);

export default router;
