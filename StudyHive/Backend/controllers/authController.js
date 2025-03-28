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
      return res.status(400).json({ message: "Account already exists but is not activated. Please log in to receive OTP." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
 signup-otp-email-41-local
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

 main

    const newUser = new User({
      username,
      email: normalizedEmail,
      password: hashedPassword,
      role,
 signup-otp-email-41-local
      otp,
      otpExpiresAt,

 main
      status: "pending",
    });

    await newUser.save();

    res.status(201).json({ message: "Signup successful. Please log in to receive your OTP.", email: normalizedEmail });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup." });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found." });
    if (!user.otp || user.otp !== otp.toString()) {
      return res.status(400).json({ message: "Invalid OTP." });
    }
    
    if (user.otpExpiresAt < new Date()) {
      return res.status(400).json({ message: "OTP has expired." });
    }    

    console.log("Verifying OTP:", { provided: otp, expected: user.otp });

    if (user.otp !== otp.toString()) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    user.status = "active";
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    res.status(200).json({ message: "Account activated successfully." });
  } catch (err) {
    console.error("OTP Verification error:", err);
    res.status(500).json({ message: "Server error during OTP verification." });
  }
};

// Send OTP (used only after login if account is pending)
exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found." });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    await user.save();

    await sendOTPEmail(email.toLowerCase(), otp);
    res.status(200).json({ message: "OTP sent to email." });
  } catch (err) {
    console.error("Send OTP error:", err);
    res.status(500).json({ message: "Failed to send OTP." });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const normalizedEmail = email.toLowerCase();
    console.log("📩 Login attempt for:", normalizedEmail);

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      console.log("❌ User not found.");
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔐 Password match:", isMatch);

    if (!isMatch) {
      console.log("❌ Password incorrect.");
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    if (user.status === "pending") {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      await user.save();
      await sendOTPEmail(normalizedEmail, otp);
    }

    console.log("✅ Login successful. User ID:", user._id);

    res.status(200).json({
      token,
      status: user.status,
      username: user.username,
      userId: user._id,
    });
  } catch (err) {
    console.error("🔥 Login error:", err);
    res.status(500).json({ message: "Server error during login." });
  }
};
