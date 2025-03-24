const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8
  },
  role: {
    type: String,
    enum: ['student', 'tutor'],
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Add debug logging on save
userSchema.post('save', function(doc, next) {
  console.log('User saved to MongoDB:', {
    id: doc._id,
    username: doc.username,
    collection: doc.collection.name
  });
  next();
});

module.exports = mongoose.model('User', userSchema);