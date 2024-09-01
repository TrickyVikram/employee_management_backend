const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const Admin = require('../models/Admin');

// Register an Employee or Admin
exports.register = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    try {
        let user = await Employee.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new Employee({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            isAdmin,
        });

        await user.save();
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Login Employee or Admin
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Employee.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Check Authentication
exports.checkAuth = (req, res) => {
    if (req.user) {
        res.json({ isAuthenticated: true });
    } else {
        res.json({ isAuthenticated: false });
    }
};
