// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminMiddleware, adminController.getDashboardData);

module.exports = router;
