import express from 'express';
import mongoose from 'mongoose';
import authenticateToken from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleAuth.js';

const router = express.Router();

router.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await mongoose.connection.db.collection('users').find().toArray();
    res.json({
      database: mongoose.connection.db.databaseName,
      collection: 'users',
      count: users.length,
      users
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Protects any user logged-in to the system
router.get("/auth", authenticateToken, (req, res) => {
  res.send(`Authenticated route accessed successfully!\n Authentecated as ${req.user.role}`);
});

// Admin Only routes
router.get("/admin", authenticateToken, authorizeRoles('admin'), (req, res) => {
  res.send("Authenticated route accessed successfully!\n Welcome Admin User!");
}
);

// tutor Only routes
router.get("/tutor", authenticateToken, authorizeRoles("tutor"), (req,res) => {
  res.send("Authenticated route accessed successfully!\n Welcome Tutor User!");
});

router.get("/student", authenticateToken, authorizeRoles("student"), (req,res) => {
  res.send("Authenticated route accessed successfully!\n Welcome Student User!");
}
);




export default router;
