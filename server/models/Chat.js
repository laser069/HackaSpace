const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true },
    message: { type: String, required: true },
    user: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Chat', chatSchema);
