const Team = require('../models/Team');
const { v4: uuidv4 } = require('uuid');

exports.createTeam = async (req, res) => {
  try {
    const { name, hackathonId } = req.body;
    const chatRoomId = uuidv4();

    const team = await Team.create({
      name,
      hackathon: hackathonId,
      members: [req.user.id],
      createdBy: req.user.id,
      chatRoomId
    });

    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.joinTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await Team.findById(teamId);

    if (!team) return res.status(404).json({ msg: 'Team not found' });

    if (team.members.includes(req.user.id))
      return res.status(400).json({ msg: 'Already in team' });

    team.members.push(req.user.id);
    await team.save();

    res.json({ msg: 'Joined team', team });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getTeamsForHackathon = async (req, res) => {
  try {
    const { hackathonId } = req.params;
    const teams = await Team.find({ hackathon: hackathonId })
      .populate('members', 'username')
      .populate('createdBy', 'username');
    res.json(teams);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
