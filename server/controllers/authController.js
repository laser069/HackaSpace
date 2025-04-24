const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require("dotenv").config()

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'Email already in use' });

    // Hash password before saving user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save user to DB
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ id: user._id,username:user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("Yeahh")
    // Send response with user info and token
    res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt with:', email, password);  // Debugging

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id ,username:user.username}, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};