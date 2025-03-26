const express = require('express');
const router = express.Router();
const {
  signup,
  verifyOTP,
  sendOTP
} = require('../controllers/authController');

router.post('/signup', signup);
router.post('/verify-otp', verifyOTP);
router.post('/send-otp', sendOTP);

module.exports = router;
