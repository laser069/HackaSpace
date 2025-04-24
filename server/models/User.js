// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }],
  messagesSent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'  // A reference to the Message model
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
