// models/Hackathon.js
const mongoose = require('mongoose');

// Define the Hackathon schema
const hackathonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Title is required
      unique: true,   // Ensure the title is unique
    },
    description: {
      type: String,
      required: true, // Description is required
    },
    startDate: {
      type: Date,
      required: true, // Start date is required
    },
    endDate: {
      type: Date,
      required: true, // End date is required
    },
    location: {
      type: String,
      required: true, // Location is required
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User who created the hackathon
      required: true, // The creator must be associated with a user
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create a Hackathon model based on the schema
const Hackathon = mongoose.model('Hackathon', hackathonSchema);

module.exports = Hackathon;
