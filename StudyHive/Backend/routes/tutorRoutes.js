// Backend/routes/tutorRoutes.js
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET all active tutors
router.get("/active", async (req, res) => {
  try {
    const tutors = await User.find({ role: "tutor", status: "active" });
    res.json(tutors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tutors." });
  }
});

// GET all pending tutors
router.get("/pending", async (req, res) => {
  try {
    const tutors = await User.find({ role: "tutor", status: "pending" });
    res.json(tutors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pending tutors." });
  }
});

// POST approve/decline tutor
router.post("/approval/:id", async (req, res) => {
  try {
    const { decision } = req.body;
    const tutor = await User.findById(req.params.id);

    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found." });
    }

    tutor.status = decision === "approved" ? "active" : "declined";
    await tutor.save();
    res.json({ message: `Tutor ${decision}.` });
  } catch (err) {
    res.status(500).json({ message: "Error updating tutor status." });
  }
});

// DELETE a tutor by ID
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Tutor deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed." });
  }
});

export default router;