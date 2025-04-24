const express = require('express');
const router = express.Router();
const protect  = require('../middleware/authMiddleware'); // Protect routes by ensuring the user is authenticated
const { createHackathon, getHackathons, getHackathonById } = require('../controllers/hackathonController'); // Import controller functions
console.log(createHackathon)
// Route to create a new hackathon (protected)
router.post('/', protect, createHackathon);

// Route to get all hackathons (optional)
router.get('/', getHackathons);

router.get('/:id', getHackathonById);

module.exports = router;
