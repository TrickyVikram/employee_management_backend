const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Register
router.post('/register', authController.register);
// Login
router.post('/login', authController.login);

// Check Authentication
router.get('/check-auth', authMiddleware, authController.checkAuth);

module.exports = router;

