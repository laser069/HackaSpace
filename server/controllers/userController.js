const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');  // Find user by ID from JWT token and exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);  // Return user profile
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username email'); // Only send back public info
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const keyword = req.query.q;
    if (!keyword) return res.status(400).json({ msg: 'Search query is required' });

    const regex = new RegExp(keyword, 'i'); // case-insensitive

    const users = await User.find({
      username: { $regex: regex },
      _id: { $ne: req.user.id }, // exclude self
    }).select('username email');

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};