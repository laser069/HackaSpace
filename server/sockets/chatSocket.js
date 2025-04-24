const Message = require('../models/Message');

const chatSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('🔌 User connected');

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`👤 Joined room: ${roomId}`);
    });

    socket.on('sendMessage', async ({ roomId, message, user }) => {
      try {
        const newMessage = new Message({
          sender: user._id,
          content: message,
          chatRoomId: roomId,
        });
        await newMessage.save();

        io.to(roomId).emit('receiveMessage', {
          message,
          user,
          createdAt: newMessage.createdAt,
        });

        console.log(`💬 Message sent to ${roomId}: ${message}`);
      } catch (err) {
        console.error('❌ Error saving message:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('❌ User disconnected');
    });
  });
};

module.exports = chatSocket;
