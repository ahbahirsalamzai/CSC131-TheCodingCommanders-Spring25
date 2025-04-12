const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// GET all students
router.get("/students", async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// GET all tutors
router.get("/tutors", async (req, res) => {
  try {
    const tutors = await User.find({ role: "tutor" });
    res.json(tutors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tutors" });
  }
});

// DELETE a user
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// POST - Create new admin
router.post("/admin", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      username,
      email,
      password: hashedPassword,
      role: "admin",
      status: "active",
    });

    await admin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    console.error("Failed to create admin:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/users/admin/profile
router.get("/admin/profile", async (req, res) => {
  try {
    const admin = await User.findOne({ role: "admin" });
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    res.json({
      name: admin.username,
      email: admin.email,
      dob: admin.dob,
      phone: admin.phone,
      createdAt: admin.createdAt,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch admin profile" });
  }
});

// PATCH /api/users/admin/profile
router.patch("/admin/profile", async (req, res) => {
  try {
    const { name, email, dob, phone, currentPassword, newPassword } = req.body;

    const admin = await User.findOne({ role: "admin" });
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    // Update profile fields
    if (name) admin.username = name;
    if (email) admin.email = email;
    if (dob) admin.dob = dob;
    if (phone) admin.phone = phone;

    // Update password if provided
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, admin.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Current password is incorrect" });
      }
      admin.password = await bcrypt.hash(newPassword, 10);
    }

    await admin.save();
    res.json({ message: "Admin profile updated successfully" });
  } catch (err) {
    console.error("Failed to update admin profile:", err);
    res.status(500).json({ error: "Failed to update admin profile" });
  }
});

module.exports = router;
