// Backend/controllers/userController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ==============================
// Get Student Profile
// ==============================
export const getStudentProfile = async (req, res) => {
  try {
    const student = await User.findById(req.user._id);

    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      name: student.username,
      email: student.email,
      dob: student.dob || '',
      phone: student.phone || '',
      subjects: student.subjects || [],
      learningGoals: student.learningGoals || '',
    });
  } catch (err) {
    console.error("Error fetching student profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// Update Student Profile
// ==============================
export const updateStudentProfile = async (req, res) => {
  const { name, email, phone, dob, subjects, learningGoals } = req.body;
  try {
    const student = await User.findById(req.user._id);
    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    student.username = name || student.username;
    student.email = email || student.email;
    student.phone = phone || student.phone;
    student.dob = dob || student.dob;
    student.subjects = subjects || student.subjects;
    student.learningGoals = learningGoals || student.learningGoals;

    await student.save();
    res.status(200).json({ message: "Student profile updated successfully." });
  } catch (err) {
    console.error("Error updating student profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// Update Student Password
// ==============================
export const updateStudentPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const student = await User.findById(req.user._id);
    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ message: "New password cannot be the same as the current password" });
    }

    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(newPassword, salt);

    await student.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// Get All Users (Admin)
// ==============================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("username email role");
    res.status(200).json({ count: users.length, users });
  } catch (err) {
    console.error("Error fetching all users:", err);
    res.status(500).json({ message: "Server error fetching users" });
  }
};

// Tutor Profile Functions
export const getTutorProfile = async (req, res) => {
  try {
    const tutor = await User.findOne({ _id: req.user._id, role: "tutor" });

    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    res.json({
      name: tutor.username,
      email: tutor.email,
      dob: tutor.dob || '',
      phone: tutor.phone || '',
      subjects: tutor.subjects || [],
      philosophy: tutor.philosophy || ''
    });
  } catch (error) {
    console.error("Error fetching tutor profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTutorProfile = async (req, res) => {
  try {
    const { name, email, phone, dob, subjects, philosophy } = req.body;
    const tutor = await User.findOne({ _id: req.user._id, role: "tutor" });

    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    tutor.username = name || tutor.username;
    tutor.email = email || tutor.email;
    tutor.phone = phone || tutor.phone;
    tutor.dob = dob || tutor.dob;
    tutor.subjects = subjects || tutor.subjects;
    tutor.philosophy = philosophy || tutor.philosophy;

    await tutor.save();
    res.json({ message: "Tutor profile updated successfully." });
  } catch (error) {
    console.error("Error updating tutor profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTutorPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const tutor = await User.findOne({ _id: req.user._id, role: "tutor" });

    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, tutor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ message: "New password cannot be the same as current password" });
    }

    tutor.password = await bcrypt.hash(newPassword, 10);
    await tutor.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating tutor password:", error);
    res.status(500).json({ message: "Server error" });
  }
};
