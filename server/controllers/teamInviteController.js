const TeamInvite = require('../models/TeamInvite');
const Team = require('../models/Team');
const User = require('../models/User');

// Invite user to a team
exports.sendInvite = async (req, res) => {
  const { teamId } = req.params;
  const { invitedUserId } = req.body;
  const invitedBy = req.user.id;

  try {
    const existing = await TeamInvite.findOne({ team: teamId, invitedUser: invitedUserId });
    if (existing) return res.status(400).json({ msg: 'User already invited to this team' });

    const invite = new TeamInvite({
      team: teamId,
      invitedUser: invitedUserId,
      invitedBy,
    });

    await invite.save();
    res.status(201).json({ msg: 'Invitation sent', invite });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error sending invite' });
  }
};

// Get invites for current user
exports.getUserInvites = async (req, res) => {
  try {
    const invites = await TeamInvite.find({ invitedUser: req.user.id, status: 'pending' })
      .populate('team', 'name')
      .populate('invitedBy', 'username');

    res.json(invites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching invites' });
  }
};

// Accept or reject an invite
exports.respondToInvite = async (req, res) => {
  const { inviteId } = req.params;
  const { status } = req.body;

  if (!['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ msg: 'Invalid status' });
  }

  try {
    const invite = await TeamInvite.findById(inviteId);
    if (!invite || invite.invitedUser.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    invite.status = status;
    await invite.save();

    if (status === 'accepted') {
      await Team.findByIdAndUpdate(invite.team, {
        $addToSet: { members: invite.invitedUser },
      });
    }

    res.json({ msg: `Invite ${status}`, invite });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to update invite status' });
  }
};
