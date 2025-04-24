const ChatRoom = require('../models/ChatRoom');
const Team = require('../models/Team');

// Create a chatroom under a team
exports.createChatRoom = async (req, res) => {
  try {
    const { teamId, name } = req.body;
    const userId = req.user.id;

    // Validate team
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }

    // Check if user is a member of the team
    if (!team.members.includes(userId)) {
      return res.status(403).json({ msg: 'You are not a member of this team' });
    }

    // Create the chatroom
    const chatRoom = new ChatRoom({
      name,
      team: teamId,
      members: [userId], // Add creator by default
    });
    await chatRoom.save();

    // Add chatroom reference to the team
    team.chatRooms.push(chatRoom._id);
    await team.save();

    res.status(201).json(chatRoom);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to create chat room' });
  }
};

// Get all chatrooms for a team
exports.getTeamChatRooms = async (req, res) => {
  try {
    const { teamId } = req.params;

    const chatRooms = await ChatRoom.find({ team: teamId }).populate('members', 'username email');
    res.json(chatRooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Could not retrieve chat rooms' });
  }
};

// Get a specific chatroom
exports.getChatRoomById = async (req, res) => {
  try {
    const { chatRoomId } = req.params;

    const chatRoom = await ChatRoom.findById(chatRoomId).populate('members', 'username email');
    if (!chatRoom) {
      return res.status(404).json({ msg: 'Chat room not found' });
    }

    res.json(chatRoom);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch chat room' });
  }
};

// Optional: Add a user to a chatroom
exports.addUserToChatRoom = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const { userId } = req.body;

    const chatRoom = await ChatRoom.findById(chatRoomId);
    if (!chatRoom) return res.status(404).json({ msg: 'Chat room not found' });

    if (!chatRoom.members.includes(userId)) {
      chatRoom.members.push(userId);
      await chatRoom.save();
    }

    res.json({ msg: 'User added to chat room', chatRoom });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to add user to chat room' });
  }
};
