/**
 * This is the Admin model. 
 * It requires a unique email, a password and a optional name.
 */

const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        unique: false
    },

    firstName: {
        type: String,
        required: true,
        unique: false
    },

    lastName: {
        type: String,
        required: true,
        unique: false
    }
});

module.exports = mongoose.model('Admin', adminSchema);