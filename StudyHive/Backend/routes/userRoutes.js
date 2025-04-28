// Backend/routes/userRoutes.js
import express from 'express';
import mongoose from 'mongoose';
import { getAllUsers, getTutorProfile, updateTutorProfile, updateTutorPassword } from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleAuth.js';

const router = express.Router();

// ✅ GET /api/users — Admin-only route
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

// ✅ Tutor Profile Routes (for /tutor-profile frontend)

// GET tutor profile
router.get("/profile", authenticateToken, getTutorProfile);

// PUT update tutor personal info
router.put("/profile", authenticateToken, updateTutorProfile);

// PUT update tutor password
router.put("/profile/password", authenticateToken, updateTutorPassword);

export default router;
