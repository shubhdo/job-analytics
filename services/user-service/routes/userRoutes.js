const express = require('express');
const { signup, login, getProfile } = require('../controllers/userController');
const authMiddleware = require('../../../shared/middleware/authMiddleware');

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Get profile route (protected)
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
