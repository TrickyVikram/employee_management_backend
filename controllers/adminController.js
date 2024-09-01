const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');

exports.getDashboardData = async (req, res) => {
    try {
        // Fetch all employees
        const employees = await Employee.find();

        // Fetch attendance data for all employees
        const attendanceData = await Attendance.find();

        // Optionally, you can format or aggregate the data as needed
        const dashboardData = {
            totalEmployees: employees.length,
            totalAttendanceRecords: attendanceData.length,
            employees: employees.map(emp => ({
                id: emp._id,
                name: emp.name,
                email: emp.email,
                isAdmin: emp.isAdmin
            })),
            attendance: attendanceData.map(record => ({
                employeeId: record.employeeId,
                date: record.date,
                status: record.status
            }))
        };

        // Send the response
        res.json(dashboardData);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
