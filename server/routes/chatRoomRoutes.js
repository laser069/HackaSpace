const express = require('express');
const router = express.Router();
const chatRoomController = require('../controllers/chatRoomController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, chatRoomController.createChatRoom);
router.get('/team/:teamId', authMiddleware, chatRoomController.getTeamChatRooms);
router.get('/:chatRoomId', authMiddleware, chatRoomController.getChatRoomById);
router.post('/:chatRoomId/add', authMiddleware, chatRoomController.addUserToChatRoom);

module.exports = router;
