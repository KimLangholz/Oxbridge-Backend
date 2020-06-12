
/**
 * This is the User model. 
 * It requires a unique email, a password and a optional name.
 */

const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model('Posts', PostSchema);
 
