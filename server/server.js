// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Load environment variables
require('dotenv').config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);

// Initialize express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("MongoDB connection error:", err));

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const hackathonRoutes = require('./routes/hackathonRoutes');
const teamRoutes = require('./routes/teamRoutes');
const chatRoutes = require('./routes/chatRoutes');

// Use routes
app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/hackathons', hackathonRoutes);
// app.use('/api/teams', teamRoutes);
// app.use('/api/chats', chatRoutes);

// Set up the server to listen on a port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
