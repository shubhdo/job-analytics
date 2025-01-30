const logger = require('../../../shared/logger/logger')
const jwtUtil = require('../../../shared/utils/jwtUtil');
const User = require('../models/userModel');

// Signup: Create a new user
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password
    });

    // Generate JWT token
    const token = jwtUtil.generateToken(user._id);
    logger.info(`New user created: ${user.email}`);


    res.status(201).json({
      message: 'User created successfully',
      token
    });
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Login: Authenticate user and return JWT token
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get Profile: Get logged-in user profile (protected route)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      name: user.name,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
