const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController'); // Ensure the path is correct

// Define routes for attendance
router.get('/', attendanceController.getAllAttendances); // Ensure this method exists in your controller
router.get('/:id', attendanceController.getAttendanceById); // Ensure this method exists in your controller
router.post('/', attendanceController.createAttendance); // Ensure this method exists in your controller
router.put('/:id', attendanceController.updateAttendance); // Ensure this method exists in your controller
router.delete('/:id', attendanceController.deleteAttendance); // Ensure this method exists in your controller

module.exports = router;
