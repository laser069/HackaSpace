const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController'); // Import the controller

// Register a new user
router.post('/register', registerUser);

// Login user and generate JWT token
router.post('/login', loginUser);

module.exports = router;
