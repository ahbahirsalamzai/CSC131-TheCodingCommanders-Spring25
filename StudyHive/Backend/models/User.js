import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Assuming you're also hashing passwords

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
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
    dob: {
      type: String, // e.g., "01-15-1990"
    },
    phone: {
      type: String, // e.g., "123-456-7890"
    },
    role: {
      type: String,
      enum: ['student', 'tutor', 'admin'],
      default: 'student',
    },
    otp: {
      type: String, // for account activation/login
    },
    resetOtp: {
      type: String, // for forgot password flow
    },
    otpExpiry: {
      type: Date, // when reset OTP expires
    },
    status: {
      type: String,
      enum: ['pending', 'active'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// ✅ Hash password before saving (if not already hashed)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
