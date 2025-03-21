const router = require("express").Router();
const { verifyOTP, otpRateLimiter } = require("../controllers/otpController");

// OTP Verification Route
router.post("/verify-otp", otpRateLimiter, verifyOTP);

module.exports = router;
