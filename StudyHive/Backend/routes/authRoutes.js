// Backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { validateSignup } = require('../middleware/validationMiddleware');

// Auth Routes
router.post('/signup', validateSignup, authController.signup);

module.exports = router;
