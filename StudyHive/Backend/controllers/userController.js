import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // Assuming your user model is here

// Update Personal Info
export const updatePersonalInfo = async (req, res) => {
  const { name, email, phone, dob } = req.body;
  try {
    const admin = await User.findById(req.user._id); // Assuming you're using authentication middleware to set req.user

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

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

// Change Password
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    const admin = await User.findById(req.user._id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Check if the current password is correct
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect current password' });
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New password and confirmation do not match' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;

    await admin.save();
    res.status(200).json({ message: 'Password changed successfully.' });
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({ message: 'Server error while changing password.' });
  }
};
