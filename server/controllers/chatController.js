const Message = require('../models/Message');
const Chat = require('../models/Chat');

// Get all messages from the global chat room
exports.getGlobalMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chatRoomId: 'global' }).populate('sender', 'username');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Post a message to the global chat room
exports.postGlobalMessage = async (req, res) => {
  const { sender, message } = req.body;

  if (!sender || !message) {
    return res.status(400).json({ message: 'Sender and message are required' });
  }

  try {
    const newMessage = await Message.create({
      sender,
      content: message,  // updated from "message" to "content"
      chatRoomId: 'global'
    });

    const populatedMessage = await newMessage.populate('sender', 'username');
    res.status(201).json(populatedMessage);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Create a new chat room
exports.createChatRoom = async (req, res) => {
  const { roomName, creatorId } = req.body;

  if (!roomName || !creatorId) {
    return res.status(400).json({ message: 'Room name and creator are required' });
  }

  try {
    const newChatRoom = new Chat({
      roomName,
      creatorId,
      members: [creatorId],
    });

    const savedRoom = await newChatRoom.save();
    res.status(201).json({ message: 'Chat room created successfully!', chatRoom: savedRoom });
  } catch (err) {
    res.status(500).json({ message: 'Error creating chat room', error: err.message });
  }
};

// Add members to a chat room
exports.addMembersToChatRoom = async (req, res) => {
  const { roomId, memberId } = req.body;

  if (!roomId || !memberId) {
    return res.status(400).json({ message: 'Room ID and member ID are required' });
  }

  try {
    const room = await Chat.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Chat room not found' });
    }

    if (room.members.includes(memberId)) {
      return res.status(400).json({ message: 'User is already in the room' });
    }

    room.members.push(memberId);
    await room.save();

    res.status(200).json({ message: 'User added to chat room', room });
  } catch (err) {
    res.status(500).json({ message: 'Error adding member', error: err.message });
  }
};

// Get all messages from a specific chat room
exports.getRoomMessages = async (req, res) => {
  const { roomId } = req.params;

  try {
    const messages = await Message.find({ chatRoomId: roomId }).populate('sender', 'username');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching messages', error: err.message });
  }
};

// Post a message to a specific chat room
exports.postRoomMessage = async (req, res) => {
  const { sender, message } = req.body;
  const { roomId } = req.params;

  if (!sender || !message) {
    return res.status(400).json({ message: 'Sender and message are required' });
  }

  try {
    const newMessage = await Message.create({
      sender,
      content: message,  // updated from "message" to "content"
      chatRoomId: roomId
    });

    const populatedMessage = await newMessage.populate('sender', 'username');
    res.status(201).json(populatedMessage);
  } catch (err) {
    res.status(500).json({ message: 'Error posting message', error: err.message });
  }
};
