// socket/socket.js
const socketIo = require('socket.io');

let io;

const startSocketServer = (server) => {
  io = socketIo(server, {
    cors: {
      origin: '*',  // Allow all origins, adjust this for security
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle incoming messages
    socket.on('send_message', (message) => {
      io.emit('receive_message', message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = { startSocketServer };
