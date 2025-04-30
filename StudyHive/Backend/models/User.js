import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String, // Full display name
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
      select: false, // Exclude password field from query results by default
    },
    role: {
      type: String,
      enum: ['student', 'tutor', 'admin'],
      default: 'student',
    },
    dob: {
      type: String, // formatted MM-DD-YYYY
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
// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Proceed if password is not modified
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);
export default User;
