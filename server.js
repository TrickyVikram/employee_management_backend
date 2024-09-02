


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Ensure this path is correct
require('dotenv').config();
const employeeRoutes = require('./routes/employeeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes

app.use('/api/auth', (req, res, next) => {
    console.log('API hit: /api/auth');
    next();
}, authRoutes);

app.use('/api/employees', (req, res, next) => {
    console.log('API hit: /api/employees');
    next();
}, employeeRoutes);

app.use('/api/attendance', (req, res, next) => {
    console.log('API hit: /api/attendance');
    next();
}, attendanceRoutes);

app.use('/api/admin',
    (req, res, next) => {
        console.log('API hit: /api/admin');
        next();
    },
    adminRoutes);


 app.get('/', (req, res) => {
     res.send('this works api is running');
 });    


const PORT = process.env.PORT || 4500;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
