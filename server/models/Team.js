// models/Team.js
const mongoose = require('mongoose');

// Team Schema
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  hackathon: { type: mongoose.Schema.Types.ObjectId, ref: 'Hackathon', required: true },
});

module.exports = mongoose.model('Team', teamSchema);
