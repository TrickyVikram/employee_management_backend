const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

// Create a new attendance record
exports.createAttendance = async (req, res) => {
    const { employeeId, date, status } = req.body;

    try {
        // Check if the employee exists
        const employee = await Employee.findById(employeeId);
        if (!employee) return res.status(404).json({ msg: 'Employee not found' });

        // Create a new attendance record
        const attendance = new Attendance({
            employeeId,
            date,
            status
        });

        await attendance.save();
        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all attendance records
exports.getAllAttendances = async (req, res) => {
    try {
        const attendances = await Attendance.find().populate('employeeId', 'name email'); // Populate employee details
        res.json(attendances);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get attendance record by ID
exports.getAttendanceById = async (req, res) => {
    const { id } = req.params;

    try {
        const attendance = await Attendance.findById(id).populate('employeeId', 'name email');
        if (!attendance) return res.status(404).json({ msg: 'Attendance record not found' });

        res.json(attendance.status);

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update an attendance record by ID
exports.updateAttendance = async (req, res) => {
    const { id } = req.params;
    const { employeeId, date, status } = req.body;

    try {
        const attendance = await Attendance.findById(id);
        if (!attendance) return res.status(404).json({ msg: 'Attendance record not found' });

        // Update fields
        attendance.employeeId = employeeId || attendance.employeeId;
        attendance.date = date || attendance.date;
        attendance.status = status || attendance.status;

        await attendance.save();
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete an attendance record by ID
exports.deleteAttendance = async (req, res) => {
    const { id } = req.params;

    try {
        const attendance = await Attendance.findById(id);
        if (!attendance) return res.status(404).json({ msg: 'Attendance record not found' });

        await attendance.remove();
        res.json({ msg: 'Attendance record removed' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
