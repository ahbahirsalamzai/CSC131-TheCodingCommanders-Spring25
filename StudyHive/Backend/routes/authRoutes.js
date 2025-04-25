import express from 'express';
import {
  signup,
  login,
  sendOTP,
  verifyOTP,
  forgotPassword,
  verifyForgotPasswordOTP,
  resetPassword,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-otp', verifyOTP);
router.post('/send-otp', sendOTP);
router.post('/forgot-password', forgotPassword);
router.post('/verify-forgot-otp', verifyForgotPasswordOTP);
router.post('/reset-password', resetPassword);

export default router;
