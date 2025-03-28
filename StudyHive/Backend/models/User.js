const mongoose = require("mongoose");

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
      enum: ["student", "tutor"],
      default: "student",
    },
    otp: {
      type: String, // for account activation/login
    },
    status: {
      type: String,
      enum: ["pending", "active"],
      default: "pending",
    },
    resetOtp: {
      type: String, // for forgot password flow
    },
    otpExpiry: {
      type: Date, // when reset OTP expires
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
