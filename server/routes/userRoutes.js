// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Protect routes by ensuring the user is authenticated
const User = require('../models/user'); // User model for database operations

// Get user profile (protected route)
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password field
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user profile', error });
  }
});

// Update user profile (protected route)
router.put('/profile', protect, async (req, res) => {
  const { name, email } = req.body;
  
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile', error });
  }
});

module.exports = router;
