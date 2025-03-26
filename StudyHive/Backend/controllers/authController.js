const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendOTPEmail = require('../utils/emailSender');

// Signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser && existingUser.status === "active") {
      return res.status(400).json({ message: "Email already exists." });
    }

    if (existingUser && existingUser.status === "pending") {
      const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
      existingUser.otp = newOTP;
      await existingUser.save();
      await sendOTPEmail(normalizedEmail, newOTP);
      return res.status(200).json({ message: "OTP resent to your email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User({
      username,
      email: normalizedEmail,
      password: hashedPassword,
      role,
      otp,
      status: "pending",
    });

    await newUser.save();
    await sendOTPEmail(normalizedEmail, otp);

    res.status(201).json({ message: "Signup successful. Check your email for the OTP.", email: normalizedEmail });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup." });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found." });

    // ✅ THIS IS GOOD – KEEP THIS ONE!
    console.log("Verifying OTP:", { provided: otp, expected: user.otp });

    if (user.otp !== otp.toString()) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    user.status = "active";
    user.otp = undefined;
    await user.save();

    res.status(200).json({ message: "Account activated successfully." });
  } catch (err) {
    console.error("OTP Verification error:", err);
    res.status(500).json({ message: "Server error during OTP verification." });
  }
};


// Send OTP (used after redirect)
exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found." });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    await user.save();

    await sendOTPEmail(email.toLowerCase(), otp);
    res.status(200).json({ message: "OTP resent to email." });
  } catch (err) {
    console.error("Send OTP error:", err);
    res.status(500).json({ message: "Failed to send OTP." });
  }
};
