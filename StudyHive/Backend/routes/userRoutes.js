import express from 'express';
import mongoose from 'mongoose';
import { updatePersonalInfo, changePassword, getAllUsers } from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleAuth.js';
import { validatePersonalInfoUpdate, validatePasswordChange } from '../middleware/validationMiddleware.js';

const router = express.Router();

// GET /api/users — Admin-only route
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

// New route to update personal info
router.put("/update", authenticateToken, validatePersonalInfoUpdate, updatePersonalInfo);

// New route to change password
router.put("/change-password", authenticateToken, validatePasswordChange, changePassword);

export default router;
