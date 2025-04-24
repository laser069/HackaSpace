const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who sends the message
    required: true,
  },
  content: {
    type: String,
    required: true, // Message content
  },
  chatRoomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team', // Link message to a team via chatRoomId
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the timestamp
  },
}, {
  timestamps: true, // Automatically manage `createdAt` and `updatedAt`
});

messageSchema.post('save', async function (doc, next) {
  const User = require('./User');
  const user = await User.findById(doc.sender);
  if (user) {
    user.messagesSent.push(doc._id); // Add message to the user's `messagesSent` array
    await user.save();
  }
  next();
});

module.exports = mongoose.model('Message', messageSchema);
