const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
// should have been in mongoose object Id refs it is a design compromise to save time, ideally should be in a separate collection and ref'd here    
    favorites: [String],

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);