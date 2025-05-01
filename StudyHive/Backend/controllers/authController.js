import bcrypt from 'bcryptjs'; // for hashing passwords and comparing hashes
import jwt from 'jsonwebtoken'; // Creating the JWTs
import User from '../models/User.js'; 
import sendOTPEmail from '../utils/emailSender.js'; // Helps send OTP for acc verification

// ---------------------------
// Sign Up Controller
// ---------------------------
export const signup = async (req, res) => { // Handle sign up - breaks down users input
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
      status: "pending", // auto set as pending - active once OTP verification is done
    });

    await newUser.save();

    const token = jwt.sign({ // Generating the Json web token - Valid 1 day
      userId: newUser._id,
      role: newUser.role,
      email: newUser.email,
    }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup." });
  }
};

// ---------------------------
// Verify OTP After Signup
// ---------------------------
export const verifyOTP = async (req, res) => { // completes account activation - OTP Verification
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
// Standalone Send OTP Endpoint (for signup or manual resend)
// ---------------------------
export const sendOTP = async (req, res) => { // Send SignUp/Login OTP
  const { email } = req.body;

  try {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    await user.save();

    await sendOTPEmail(normalizedEmail, otp);

    res.status(200).json({ message: "OTP sent to email." });
  } catch (err) {
    console.error("Send OTP error:", err);
    res.status(500).json({ message: "Failed to send OTP." });
  }
};

// ---------------------------
// Login Controller
// ---------------------------
export const login = async (req, res) => {  // Login - if pending send a new OTP verification code
  console.log("Received req.body:", req.body); // debug purpose
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    if (!user.password) {
      return res.status(400).json({ message: "User password is missing." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // If account is still pending, re-send OTP but don't crash if email fails
    if (user.status === "pending") {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      await user.save();

      try {
        await sendOTPEmail(normalizedEmail, otp);
      } catch (emailErr) {
        console.error("Failed to send OTP email during login:", emailErr.message);
        return res.status(500).json({ message: "Login successful, but OTP email failed to send." });
      }
    }

    const token = jwt.sign( // Include role, userId, and more in JWT
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

    res.status(200).json({
      token,
      status: user.status,
      username: user.username,
      userId: user._id,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error("Login error:", err.stack);
    res.status(500).json({ message: "Server error during login." });
  }
};

// ---------------------------
// Forgot Password - Send OTP
// ---------------------------
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

    console.log("Generated OTP for reset:", otp);
    await user.save();

    console.log("OTP and expiry saved to user:", {
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
export const verifyForgotPasswordOTP = async (req, res) => {
  const { email, otp } = req.body;

  console.log("Verifying OTP for reset:", { email, otp });

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
export const resetPassword = async (req, res) => {
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
