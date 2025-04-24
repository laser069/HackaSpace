const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createTeam,
  joinTeam,
  getTeamsForHackathon
} = require('../controllers/teamController');

router.post('/', auth, createTeam);
router.post('/:teamId/join', auth, joinTeam);
router.get('/hackathon/:hackathonId', getTeamsForHackathon);

module.exports = router;
