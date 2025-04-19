// routes/teamRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Protect routes
const Team = require('../models/Team'); // Team model for database operations
const Hackathon = require('../models/Hackathon'); // Hackathon model for hackathon association

// Create a new team (protected route)
router.post('/', protect, async (req, res) => {
  const { name, hackathonId, members } = req.body;

  // Check if the hackathon exists
  const hackathon = await Hackathon.findById(hackathonId);
  if (!hackathon) {
    return res.status(400).json({ message: 'Hackathon not found' });
  }

  const newTeam = new Team({
    name,
    hackathon: hackathonId,
    members: [...members, req.user.id], // Add the current user as part of the team
  });

  try {
    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ message: 'Error creating team', error });
  }
});

// Get all teams for a specific hackathon
router.get('/:hackathonId', async (req, res) => {
  const { hackathonId } = req.params;

  try {
    const teams = await Team.find({ hackathon: hackathonId }).populate('members', 'name email');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams', error });
  }
});

module.exports = router;
