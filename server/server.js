const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const hackathonRoutes = require('./routes/hackathonRoutes');
const teamRoutes = require('./routes/teamRoutes');
const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/userRoutes');
const jwt = require('jsonwebtoken');  // Importing jwt
const Message = require('./models/Message');  // Importing Message model
// const teamInviteRoutes = require('./routes/teamInviteRoutes');
const TeamChatRooms = require("./routes/chatRoomRoutes")

require('dotenv').config(); // Make sure you load environment variables

const app = express();
const server = http.createServer(app);

// Initialize Socket.io with CORS settings
const io = socketIo(server, {
  cors: {
    origin: '*',  // Ensure this matches your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',  // Allow frontend React app
  credentials: true,  // Enable cookies to be sent
}));
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/hackathonDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Socket.io authentication middleware (using JWT)
io.use((socket, next) => {
  const token = socket.handshake.auth.token;  // Extract token from the handshake
  if (!token) {
    return next(new Error('Authentication error: No token'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new Error('Authentication error: Invalid token'));
    }
    socket.user = {
      _id: decoded.id,  // match Mongoose expectations
      username: decoded.username
    };
    next();
  });
});

// Socket.io events
let activeRooms = {};
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
    console.log(`User left room: ${roomId}`);
  });

  socket.on('sendMessage', async ({ roomId, message }) => {
    try {
      const senderId = socket.user._id;

      const newMessage = new Message({
        sender: senderId,
        content: message,
        chatRoomId: roomId,
      });

      const savedMessage = await newMessage.save();
      const populatedMessage = await savedMessage.populate('sender', 'username');

      io.to(roomId).emit('receiveMessage', populatedMessage);
      console.log(`Message sent to ${roomId} by ${populatedMessage.sender.username}: ${message}`);
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hackathons', hackathonRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/user', userRoutes);
app.use("/api/chatrooms/",TeamChatRooms)
// app.use("/api/invites",teamInviteRoutes)

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
