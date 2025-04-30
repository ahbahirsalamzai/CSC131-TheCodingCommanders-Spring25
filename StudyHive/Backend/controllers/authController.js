import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import sendOTPEmail from '../utils/emailSender.js';

// ==============================
// Signup New User
// ==============================
export const signup = async (req, res) => {
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

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup." });
  }
};

// ==============================
// Verify OTP to Activate Account
// ==============================
export const verifyOTP = async (req, res) => {
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

// ==============================
// Send OTP for Signup or Login
// ==============================
export const sendOTP = async (req, res) => {
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

// ==============================
// Login User
// ==============================
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    if (!user.password) {
      return res.status(400).json({ message: "User password is missing." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    //const isMatch = await bcrypt.compare(password, user.password);
    //console.log("🔍 user.password from DB:", user.password); // debug
    //console.log("🔍 password from request:", password);       // debug

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Handle pending users
    if (user.status === "pending") {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      await user.save();

      try {
        await sendOTPEmail(normalizedEmail, otp);
      } catch (emailErr) {
        console.error("❌ Failed to send OTP email during login:", emailErr.message);
        return res.status(500).json({ message: "Login successful, but OTP email failed to send." });
      }
    }

    // ✅ Generate and send token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      status: user.status,
      userId: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

  } catch (err) {
    console.error("Login error:", err.stack);
    res.status(500).json({ message: "Server error during login." });
  }
};


// ==============================
// Forgot Password - Send OTP
// ==============================
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: "No user found with this email." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();
    await sendOTPEmail(normalizedEmail, otp);

    res.status(200).json({ message: "OTP sent to your email.", email: normalizedEmail });
  } catch (err) {
    console.error("Forgot Password error:", err);
    res.status(500).json({ message: "Server error while sending OTP." });
  }
};

// ==============================
// Verify OTP for Forgot Password
// ==============================
export const verifyForgotPasswordOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

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

// ==============================
// Reset Password with New Password
// ==============================
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    user.password = newPassword; // This will trigger the pre-save hook to hash the password
    await user.save();

    res.status(200).json({ message: 'Password reset successful.' });
  } catch (err) {
    console.error('Reset Password error:', err);
    res.status(500).json({ message: 'Server error while resetting password.' });
  }
};