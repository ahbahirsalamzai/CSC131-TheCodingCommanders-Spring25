const OTP = require("../models/otpModel");
const rateLimit = require("express-rate-limit");

// Rate limit: max 5 attempts per 15 minutes
const otpRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { success: false, message: "Too many attempts. Try again later." },
});

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        if (!email || !otp) {
            return res.status(400).json({ success: false, message: "Email and OTP are required." });
        }

        const existingOTP = await OTP.findOne({ email, otp });

        if (!existingOTP) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
        }

        // Delete OTP after use
        await OTP.deleteOne({ email, otp });

        return res.status(200).json({ success: true, message: "OTP verified successfully." });
    } catch (error) {
        console.error("OTP Verification Error:", error);
        return res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};

exports.otpRateLimiter = otpRateLimiter;
