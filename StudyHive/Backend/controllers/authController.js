import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 
import sendOTPEmail from '../utils/emailSender.js';

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, role } = req.body;
    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser && existingUser.status === "active") {
      return res.status(400).json({ message: "Email already exists." });
    }

    if (existingUser && existingUser.status === "pending") {
      return res.status(400).json({ message: "Account exists but is not activated." });
    }
    const newUser = new User({
      firstName,
      lastName,
      username,
      email: normalizedEmail,
      password,
      role,
      status: "pending",
    });

    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
        role: newUser.role,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({ token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup." });
  }
};

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

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

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

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        status: user.status,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    if (user.status === "pending") {
      if (!user.otp || user.otpExpiry < Date.now()) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();

        try {
          await sendOTPEmail(normalizedEmail, otp);
        } catch (emailErr) {
          console.error("Failed to send OTP email during login:", emailErr.message);
          return res.status(500).json({ message: "Login successful, but OTP email failed to send." });
        }
      }

      return res.status(200).json({
        message: "Account pending verification. OTP sent.",
        status: user.status,
        email: user.email,
      });
    }

    res.status(200).json({
      message: "Login successful.",
      token,
      status: user.status,
      username: user.username,
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login." });
  }
};


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

export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found." });

    //const hashed = await bcrypt.hash(newPassword, 10);
    //user.password = hashed;
    user.password = newPassword; // ✅ Let schema handle hashing
    await user.save();

    res.status(200).json({ message: "Password reset successful." });
  } catch (err) {
    console.error("Reset Password error:", err);
    res.status(500).json({ message: "Server error while resetting password." });
  }
};
