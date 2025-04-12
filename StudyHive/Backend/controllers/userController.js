const bcrypt = require("bcryptjs");
const User = require("../models/User");

// GET admin profile
const getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.user.id).select("-password");
    if (!admin || admin.role !== "admin") {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      name: admin.username,
      email: admin.email,
      dob: admin.dob,
      phone: admin.phone,
    });
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH admin profile
const updateAdminProfile = async (req, res) => {
  try {
    const { name, email, phone, dob, currentPassword, newPassword } = req.body;
    const admin = await User.findById(req.user.id);

    if (!admin || admin.role !== "admin") {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (name) admin.username = name;
    if (email) admin.email = email;
    if (phone) admin.phone = phone;
    if (dob) admin.dob = dob;

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: "❌ Current password is incorrect" });
      }
      admin.password = await bcrypt.hash(newPassword, 10);
    }

    await admin.save();
    res.json({ message: "✅ Profile updated successfully" });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAdminProfile,
  updateAdminProfile,
};
