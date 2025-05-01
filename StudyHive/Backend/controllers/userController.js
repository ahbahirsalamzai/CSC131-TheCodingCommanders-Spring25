import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// ==============================
// Update Personal Info
// Purpose: Allow admin to update their personal details (name, email, phone, DOB)
// ==============================
export const updatePersonalInfo = async (req, res) => {
  const { name, email, phone, dob } = req.body;
  try {
    const admin = await User.findById(req.user._id); // Find user by token _id

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // ==========================
    // Validate for duplicate Name, Email, Phone Number, DOB
    // ==========================
    const existingAdminWithName = await User.findOne({ name });
    if (existingAdminWithName && existingAdminWithName._id.toString() !== admin._id.toString()) {
      return res.status(400).json({ message: 'This name is already taken.' });
    }

    const existingAdminWithEmail = await User.findOne({ email });
    if (existingAdminWithEmail && existingAdminWithEmail._id.toString() !== admin._id.toString()) {
      return res.status(400).json({ message: 'This email is already taken.' });
    }

    const existingAdminWithPhone = await User.findOne({ phone });
    if (existingAdminWithPhone && existingAdminWithPhone._id.toString() !== admin._id.toString()) {
      return res.status(400).json({ message: 'This phone number is already taken.' });
    }

    const existingAdminWithDOB = await User.findOne({ dob });
    if (existingAdminWithDOB && existingAdminWithDOB._id.toString() !== admin._id.toString()) {
      return res.status(400).json({ message: 'This Date of Birth is already taken.' });
    }

    // Update fields if provided
    admin.name = name || admin.name;
    admin.email = email || admin.email;
    admin.phone = phone || admin.phone;
    admin.dob = dob || admin.dob;

    await admin.save();
    res.status(200).json({ message: 'Personal information updated successfully.' });
  } catch (err) {
    console.error('Error updating personal info:', err);
    res.status(500).json({ message: 'Server error updating personal info.' });
  }
};

// ==============================
// Change Password
// Purpose: Allow admin to securely change their password
// ==============================
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    const admin = await User.findById(req.user._id);

    if (!admin) {
      return res.status(404).json({
        errors: {
          currentPassword: 'Admin not found',
        },
      });
    }

    // Check if the current password matches
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        errors: {
          currentPassword: 'Incorrect current password',
        },
      });
    }

    // Check if new password and confirmation match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        errors: {
          confirmPassword: 'New password and confirmation do not match',
        },
      });
    }

    // Check if the new password is the same as the current password
    if (currentPassword === newPassword) {
      return res.status(400).json({
        errors: {
          newPassword: 'New password cannot be the same as the current password.',
        },
      });
    }

    // Hash and update the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;

    await admin.save();
    res.status(200).json({ message: 'Password changed successfully.' });
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({
      errors: {
        general: 'Server error while changing password.',
      },
    });
  }
};

// ==============================
// Get Current Admin Profile
// Purpose: Fetch the logged-in admin's basic profile (name, email, phone, dob)
// ==============================
export const getMyProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.user._id).select('username email phone dob');

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json(admin);
  } catch (err) {
    console.error('Error fetching admin profile:', err);
    res.status(500).json({ message: 'Server error fetching profile information' });
  }
};

// ==============================
// Get All Users
// Purpose: Admin can see the list of all users
// ==============================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('name email phone dob role'); // Only select necessary fields
    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (err) {
    console.error('Error fetching all users:', err);
    res.status(500).json({ message: 'Server error fetching all users' });
  }
};
