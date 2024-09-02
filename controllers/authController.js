const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const Admin = require('../models/Admin');

// Register an Employee or Admin
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if any admin already exists
        const existingAdmin = await Admin.findOne();

        if (!existingAdmin) {
            // Register as Admin
            const hashedPassword = await bcrypt.hash(password, 10);
            const admin = new Admin({
                name,
                email,
                password: hashedPassword,
                isAdmin: 1, // Set isAdmin to 0
            });

            await admin.save();
            // Generate token with id, isAdmin, and email
            const token = jwt.sign(
                { id: admin._id, isAdmin: admin.isAdmin, role:"admin"},
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            return res.json({ token });
        }

        // Register as Employee
        let user = await Employee.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new Employee({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            isAdmin: 0, // Set isAdmin to 0
        });

        await user.save();
        // Generate token with id, isAdmin, and email
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin, role:"user" },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
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
        const admin = await Admin.findOne({ email });
        if (!user && !admin) return res.status(400).json({ msg: 'Invalid credentials' });

        // Login Employee
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

            // Generate token with id, isAdmin, and email
            const token = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin, role:"user"},
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            
            return res.json({ token });  // Return both msg and token
        }

        // Login Admin
        if (admin) {
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

            // Generate token with id, isAdmin, and email
            const token = jwt.sign(
                { id: admin._id, isAdmin: admin.isAdmin, role:"admin" },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
       
            return res.json({ token });  // Return both msg and token
        }
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
