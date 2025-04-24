const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  hackathon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hackathon',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  chatRooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatRoom'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Team', teamSchema);
