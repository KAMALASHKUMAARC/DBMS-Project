const Booking = require("../models/Booking");
const Movie = require("../models/Movie");
const User = require('../models/User');

const getUserBooking = async (req, res) => {
    try {
        const user = req.user._id;

        const bookings = await Booking.find({user}).populate({
            path: "show",
            populate: {path: "movie"}
        }).sort({createdAt: -1});

        res.json({success: true, bookings})
    } catch (error) {
        console.error(error.message);
        res.json({success: false, message: error.message})
    }
}

//API controller Function to update favorite movie in user profile
const updateFavorite = async (req, res) => {

    try {
        const userId = req.user._id;
        const { movieId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
         const movieIdStr = movieId.toString();
        // check if already favorited
        if (!user.favorites.includes(movieIdStr)) {
            user.favorites.push(movieIdStr);
        } else {
            user.favorites = user.favorites.filter(
                id => id.toString() !== movieIdStr
            );
        }
        await user.save();
        const movies = await Movie.find({
            _id: { $in: user.favorites }
        });
        res.json({
            success: true,
            message: 'Favorites movies updated',
            movies
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getFavorites = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const movies = await Movie.find({
            _id: { $in: user.favorites }
        });

        return res.json({
            success: true,
            movies
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getProfile = async (req, res) => {

        try {
            res.json({
                success: true,
                user: req.user
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

module.exports = {
    getUserBooking,
    updateFavorite,
    getFavorites,
    getProfile
};