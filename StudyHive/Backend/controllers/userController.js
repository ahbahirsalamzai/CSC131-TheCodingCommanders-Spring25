import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// ==============================
// Update Personal Info
// Purpose: Allow admin to update their personal details (username, email)
// ==============================
export const updatePersonalInfo = async (req, res) => {
  const { username, email } = req.body;

  try {
    const admin = await User.findById(req.user.id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const existingAdminWithName = await User.findOne({ username });
    if (existingAdminWithName && existingAdminWithName._id.toString() !== admin._id.toString()) {
      return res.status(400).json({ message: 'This name is already taken.' });
    }

    const existingAdminWithEmail = await User.findOne({ email });
    if (existingAdminWithEmail && existingAdminWithEmail._id.toString() !== admin._id.toString()) {
      return res.status(400).json({ message: 'This email is already taken.' });
    }

    admin.username = username || admin.username;
    admin.email = email || admin.email;

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
    const admin = await User.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({
        errors: {
          currentPassword: 'Admin not found',
        },
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        errors: {
          currentPassword: 'Incorrect current password',
        },
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        errors: {
          confirmPassword: 'New password and confirmation do not match',
        },
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        errors: {
          newPassword: 'New password cannot be the same as the current password.',
        },
      });
    }

    // ✅ Hash the new password before saving
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
// Purpose: Fetch the logged-in admin's profile (username, email)
// ==============================
export const getMyProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.user.id).select('username email');

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({
      username: admin.username,
      email: admin.email,
    });
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
    const users = await User.find().select('name email phone dob role');
    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (err) {
    console.error('Error fetching all users:', err);
    res.status(500).json({ message: 'Server error fetching all users' });
  }
};
