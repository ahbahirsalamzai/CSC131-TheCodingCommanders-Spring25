// const express = require('express');
// const router = express.Router();
// const {
//   signup,
//   verifyOTP,
//   sendOTP
// } = require('../controllers/authController');

// router.post('/signup', signup);
// router.post('/verify-otp', verifyOTP);
// router.post('/send-otp', sendOTP);

// module.exports = router;
const express = require('express');
const router = express.Router();
const {
  signup,
  verifyOTP,
  sendOTP,
  login, // ⬅️ Add this import
} = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login); // ⬅️ Add this route
router.post('/verify-otp', verifyOTP);
router.post('/send-otp', sendOTP);

module.exports = router;
