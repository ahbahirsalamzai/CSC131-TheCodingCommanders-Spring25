const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: String,
  role: {
    type: String,
    enum: ["student", "tutor"],
    default: "student",
  },
  otp: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "active"],
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
