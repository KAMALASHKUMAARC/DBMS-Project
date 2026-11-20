const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    poster_path: {
        type: String,
        required: true
    },
    backdrop_path: {
        type: String
    },
    release_date: {
        type: String
    },
    original_language: {
        type: String
    },
    tagline: {
        type: String
    },
    vote_average: {
        type: Number,
        default: 0
    },
    runtime: {
        type: Number
    },
    genres: [
        {
            name: String
        }
    ],
    casts: [
        {
            name: String,
            profile_path: String
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);