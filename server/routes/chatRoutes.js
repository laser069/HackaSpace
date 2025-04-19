// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Protect routes
const Message = require('../models/Message'); // Message model for storing chat messages

// Send a message in a chat (protected route)
router.post('/', protect, async (req, res) => {
  const { text, chatId } = req.body;

  const newMessage = new Message({
    text,
    sender: req.user.id, // The logged-in user sends the message
    chat: chatId,
  });

  try {
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
});

// Get all messages in a chat
router.get('/:chatId', async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chat: chatId }).populate('sender', 'name email');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
});

module.exports = router;
