const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    console.log('Received signup data:', req.body);
    
    // Validate password match
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Create user document
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12),
      role: req.body.role
    });

    // Save to database with error handling
    await user.save({ validateBeforeSave: true });
    
    // Return success (excluding password)
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(201).json({
      message: 'User created successfully',
      user: userResponse
    });

  } catch (err) {
    console.error('Signup error:', err);
    
    // Handle duplicate key errors
    if (err.code === 11000) {
      const field = err.message.includes('email') ? 'Email' : 'Username';
      return res.status(409).json({ error: `${field} already exists` });
    }
    
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
};