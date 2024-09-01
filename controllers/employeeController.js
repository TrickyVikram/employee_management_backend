const Employee = require('../models/Employee');

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ msg: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createEmployee = async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        
        const savedEmployee = await newEmployee.save();
        res.json(savedEmployee);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEmployee) return res.status(404).json({ msg: 'Employee not found' });
        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) return res.status(404).json({ msg: 'Employee not found' });
        res.json({ msg: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
