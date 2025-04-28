import express from 'express';
import mongoose from 'mongoose';
import { getAllUsers } from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleAuth.js';

const router = express.Router();


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

export default router;
