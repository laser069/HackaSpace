const Hackathon = require('../models/Hackathon');

// Create a new hackathon
const createHackathon = async (req, res) => {
  const { name, description, startDate, endDate } = req.body;

  try {
    const newHackathon = new Hackathon({
      name,
      description,
      startDate,
      endDate,
      createdBy: req.user.id,
    });

    const savedHackathon = await newHackathon.save();
    res.status(201).json(savedHackathon);
  } catch (err) {
    console.error('Error creating hackathon:', err);
    res.status(500).json({ message: 'Error creating hackathon', error: err.message });
  }
};

// Get all hackathons
const getHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    res.json(hackathons);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching hackathons', error: err.message });
  }
};

// ✅ Get a single hackathon by ID
const getHackathonById = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }
    res.json(hackathon);
  } catch (err) {
    console.error('Error fetching hackathon:', err);
    res.status(500).json({ message: 'Error fetching hackathon', error: err.message });
  }
};

module.exports = {
  createHackathon,
  getHackathons,
  getHackathonById, // 👈 Don't forget to export it
};
