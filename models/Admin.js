const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Number, 
        // default: 1, 
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Admin', AdminSchema);
