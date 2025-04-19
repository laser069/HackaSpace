// controllers/hackathonController.js
const Hackathon = require('../models/Hackathon');

// Create a new hackathon
const createHackathon = async (req, res) => {
  const { title, description, startDate, endDate, location } = req.body;

  try {
    // Create a new Hackathon instance
    const newHackathon = new Hackathon({
      title,
      description,
      startDate,
      endDate,
      location,
      creator: req.user.id, // The creator's user ID
    });

    // Save the new hackathon to the database
    await newHackathon.save();

    // Respond with success
    res.status(201).json({ message: 'Hackathon created successfully', hackathon: newHackathon });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create hackathon', error });
  }
};

module.exports = { createHackathon };
