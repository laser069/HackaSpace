// routes/hackathonRoutes.js
const express = require('express');
const router = express.Router();
const { createHackathon } = require('../controllers/hackathonController');
const authMiddleware = require('../middleware/authMiddleware'); // Auth middleware to verify token

// Create a new hackathon
router.post('/create', authMiddleware, createHackathon);

module.exports = router;
