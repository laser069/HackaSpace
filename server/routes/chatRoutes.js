const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Global chat
router.get('/global', chatController.getGlobalMessages);
router.post('/global', chatController.postGlobalMessage);

// Specific rooms
router.get('/room/:roomId', chatController.getRoomMessages);
router.post('/room/:roomId', chatController.postRoomMessage);

// Chat room management
router.post('/create-room', chatController.createChatRoom);
router.post('/add-member', chatController.addMembersToChatRoom);

module.exports = router;
