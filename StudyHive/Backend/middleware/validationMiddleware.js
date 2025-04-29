import { body, validationResult } from 'express-validator';

// ==============================
// Signup Validation
// Purpose: Validate student/tutor signup details
// ==============================
export const validateSignup = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('role').isIn(['student', 'tutor']),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// ==============================
// Login Validation
// Purpose: Validate login input (email and password)
// ==============================
export const validateLogin = [
  body('email').isEmail(),
  body('password').exists(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// ==============================
// Personal Info Update Validation
// Purpose: Validate admin personal info update (name, email, phone, dob)
// ==============================
export const validatePersonalInfoUpdate = [
  body('name').isString().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('phone').isString().optional(),
  body('dob').isString().optional(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// ==============================
// Password Change Validation
// Purpose: Validate password change fields (current, new, confirm passwords)
// ==============================
export const validatePasswordChange = [
  body('currentPassword').exists(),
  body('newPassword').isLength({ min: 8 }),
  body('confirmPassword').exists(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    next();
  }
];
