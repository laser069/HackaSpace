const express = require('express');
const router = express.Router();
const teamInviteController = require('../controllers/teamInviteController');
const authenticate = require('../middleware/authMiddleware');

router.post('/:teamId', authenticate, teamInviteController.sendInvite);
router.get('/', authenticate, teamInviteController.getUserInvites);
router.patch('/:inviteId', authenticate, teamInviteController.respondToInvite);

module.exports = router;
