const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Attendance schema
const AttendanceSchema = new Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', // Reference to the Employee model
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Leave'],
        required: true
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create the model from the schema
const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
