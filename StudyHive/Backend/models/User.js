import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
    role: {
      type: String,
      enum: ['student', 'tutor', 'admin'],
      default: 'student',
    },
    otp: String,
    resetOtp: String,
    otpExpiry: Date,
    status: {
      type: String,
      enum: ['pending', 'active'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // ✅ include virtuals in JSON output
    toObject: { virtuals: true }
  }
);

// Add virtual field for `id` (string version of _id)
userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Automatically hash the password before saving (if modified)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
