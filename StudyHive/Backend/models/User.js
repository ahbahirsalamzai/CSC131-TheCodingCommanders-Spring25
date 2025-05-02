// models/User.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String, // Full display name (optional)
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Exclude password from queries by default
    },
    role: {
      type: String,
      enum: ['student', 'tutor', 'admin'],
      default: 'student',
    },
    dob: {
      type: String, // e.g., MM-DD-YYYY
    },
    phone: {
      type: String,
    },
    subjects: {
      type: [String],
      default: [],
    },
    learningGoals: {
      type: String,
    },
    otp: {
      type: String, // For signup/login verification
    },
    resetOtp: {
      type: String, // For forgot password
    },
    otpExpiry: {
      type: Date, // Expiry time for reset OTP
    },
    status: {
      type: String,
      enum: ['pending', 'active'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash password if modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);
export default User;
