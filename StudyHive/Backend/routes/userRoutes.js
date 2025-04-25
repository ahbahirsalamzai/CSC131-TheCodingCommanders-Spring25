import express from 'express';
import { updatePersonalInfo, changePassword } from '../controllers/userController.js';
import { authenticateAdmin } from '../middleware/authMiddleware.js'; // Authentication middleware
import { validatePersonalInfoUpdate, validatePasswordChange } from '../middleware/validationMiddleware.js'; // Adding validations for personal info and password updates

const router = express.Router();

// Existing route to fetch users
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

// New route to update personal info
router.put("/update", authenticateAdmin, validatePersonalInfoUpdate, updatePersonalInfo);

// New route to change password
router.put("/change-password", authenticateAdmin, validatePasswordChange, changePassword);

module.exports = router;
