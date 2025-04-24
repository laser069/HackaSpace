const TeamRequest = require('../models/TeamInvite');
const Team = require('../models/Team');
const User = require('../models/User');

exports.sendTeamRequest = async (req, res) => {
  const { teamId } = req.params;
  const userId = req.user.id;

  try {
    const existingRequest = await TeamRequest.findOne({ teamId, userId });
    if (existingRequest) {
      return res.status(400).json({ msg: 'You have already sent a request to this team.' });
    }

    const newRequest = new TeamRequest({ teamId, userId });
    await newRequest.save();

    res.status(201).json(newRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to send join request.' });
  }
};

exports.respondToRequest = async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  if (!['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ msg: 'Invalid status' });
  }

  try {
    const request = await TeamRequest.findById(requestId).populate('userId');
    if (!request) return res.status(404).json({ msg: 'Request not found' });

    request.status = status;
    await request.save();

    res.json({ msg: `Request ${status}`, request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Could not update request' });
  }
};

exports.getAllTeamRequests = async (req, res) => {
  try {
    const requests = await TeamRequest.find({ status: 'pending' })
      .populate('userId', 'username email')
      .populate('teamId', 'name');
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Could not fetch requests' });
  }
};
