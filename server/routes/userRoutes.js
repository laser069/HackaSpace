// routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const verifyToken = require('../middleware/authMiddleware');  // JWT token verification middleware
const userController = require('../controllers/userController');
const { searchUsers } = require('../controllers/userController');
const {getAllUsers} = require("../controllers/userController")
const router = express.Router();


router.get('/all', verifyToken, getAllUsers);
// Fetch a user's sent messages
router.get('/:userId/messages', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('messagesSent');
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.json(user.messagesSent);  // Return all messages the user has sent
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/profile', verifyToken, userController.getProfile);
router.get('/search', verifyToken, searchUsers);
module.exports = router;
