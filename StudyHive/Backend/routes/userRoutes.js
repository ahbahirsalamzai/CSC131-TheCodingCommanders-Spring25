const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


router.get("/students", async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});


router.get("/tutors", async (req, res) => {
  try {
    const tutors = await User.find({ role: "tutor" });
    res.json(tutors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tutors" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});


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

module.exports = router;
