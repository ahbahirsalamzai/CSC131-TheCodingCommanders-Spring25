// Backend/routes/studentRoutes.js
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET all active students
router.get("/active", async (req, res) => {
  try {
    const students = await User.find({ role: "student", status: "active" });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch students." });
  }
});

// DELETE a student by ID
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed." });
  }
});

export default router;