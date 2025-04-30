// Backend/routes/userRoutes.js
import express from 'express';
import mongoose from 'mongoose';
import {
  getAllUsers,
  getTutorProfile,
  updateTutorProfile,
  updateTutorPassword,
  getStudentProfile,
  updateStudentProfile,
  updateStudentPassword
} from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleAuth.js';

const router = express.Router();

// ✅ GET all users — Admin-only route
router.get("/", authenticateToken, authorizeRoles('admin'), getAllUsers);

// ✅ Tutor Profile Routes (for /tutor-profile frontend)
router.get("/profile", authenticateToken, getTutorProfile);
router.put("/profile", authenticateToken, updateTutorProfile);
router.put("/profile/password", authenticateToken, updateTutorPassword);

// ✅ Student Profile Routes (for /student-profile frontend)
router.get("/student/profile", authenticateToken, getStudentProfile);
router.put("/student/profile", authenticateToken, updateStudentProfile);
router.put("/student/profile/password", authenticateToken, updateStudentPassword);

export default router;
