const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // ✅ Make sure this path and filename is correct

// Simulate sending email by logging to console
const sendResetEmail = async (email, token) => {
    console.log(`Password reset link: http://localhost:3000/reset-password?token=${token}`);
};

exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        user.tokenExpiry = Date.now() + 15 * 60 * 1000; // 15 min

        await user.save();
        await sendResetEmail(email, resetToken);

        res.json({ success: true, message: "Password reset link sent" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {
        const user = await User.findOne({
            resetToken: token,
            tokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired token" });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetToken = null;
        user.tokenExpiry = null;

        await user.save();
        res.json({ success: true, message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};