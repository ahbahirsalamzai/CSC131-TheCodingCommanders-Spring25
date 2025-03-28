const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendOTPEmail = require('../utils/emailSender');

// ---------------------------
// Sign Up
// ---------------------------
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

    const newUser = new User({
      username,
      email: normalizedEmail,
      password: hashedPassword,
      role,
      status: "pending",
    });

    await newUser.save();

    res.status(201).json({ message: "Signup successful. Please log in to receive your OTP.", email: normalizedEmail });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup." });
  }
};

// ---------------------------
// Verify SignUp OTP
// ---------------------------
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found." });

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

// ---------------------------
// Send SignUp/Login OTP
// ---------------------------
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

// ---------------------------
// Login
// ---------------------------
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // If user is pending, send OTP
    if (user.status === "pending") {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      await user.save();
      await sendOTPEmail(normalizedEmail, otp);
    }

    res.status(200).json({
      token,
      status: user.status,
      username: user.username,
      userId: user._id,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login." });
  }
};

// ---------------------------
// Forgot Password - Send OTP
// ---------------------------
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: "No user found with this email." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    console.log("Generated OTP for reset:", otp);

    await user.save(); // 🔥 Save OTP and expiry to the database

    console.log("✅ OTP and expiry saved to user:", {
      email: user.email,
      resetOtp: user.resetOtp,
      otpExpiry: user.otpExpiry,
    });

    await sendOTPEmail(normalizedEmail, otp);

    res.status(200).json({ message: "OTP sent to your email.", email: normalizedEmail });
  } catch (err) {
    console.error("Forgot Password error:", err);
    res.status(500).json({ message: "Server error while sending OTP." });
  }
};


// ---------------------------
// Verify OTP for Forgot Password
// ---------------------------
exports.verifyForgotPasswordOTP = async (req, res) => {
  const { email, otp } = req.body;

  console.log("🔐 Verifying OTP for reset:", { email, otp });

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    console.log("Stored OTP:", user.resetOtp);
    console.log("Entered OTP:", otp);
    console.log("Expiry:", user.otpExpiry, "Now:", Date.now());

    const storedOtp = user.resetOtp?.toString();
    const enteredOtp = otp?.toString();

    if (!storedOtp || storedOtp !== enteredOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    if (!user.otpExpiry || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP has expired." });
    }

    user.resetOtp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully." });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ message: "Server error during OTP verification." });
  }
};

// ---------------------------
// Reset Password
// ---------------------------
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found." });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.status(200).json({ message: "Password reset successful." });
  } catch (err) {
    console.error("Reset Password error:", err);
    res.status(500).json({ message: "Server error while resetting password." });
  }
};
