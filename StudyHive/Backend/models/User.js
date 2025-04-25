import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
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
    },
    role: {
      type: String,
      enum: ['student', 'tutor'],
      default: 'student',
    },
    phone: {
      type: String,
    },
    dob: {
      type: Date,
    },
    subjects: {
      type: [String], // an array of subjects
    },
    philosophy: {
      type: String,
    },
    otp: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'active'],
      default: 'pending',
    },
    resetOtp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
