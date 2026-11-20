const express = require('express');
const { getUserBooking, updateFavorite, getFavorites, getProfile } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const userRouter = express.Router();

userRouter.get('/bookings', protect, getUserBooking)
userRouter.post('/update-favorite', protect, updateFavorite)
userRouter.get('/favorites', protect, getFavorites)
userRouter.get('/profile',protect, getProfile)

module.exports = userRouter;