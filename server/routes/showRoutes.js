const express = require('express');
const { getNowPlayingMovies, addShow, getShows, getShow } =require ('../controllers/showController');
const authMiddleware = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/auth');
const { getAllBookings } = require('../controllers/adminController');

const showRouter = express.Router();

showRouter.get('/now-playing',authMiddleware, adminOnly, getNowPlayingMovies)
showRouter.post('/add',authMiddleware, adminOnly, addShow)
showRouter.get("/all", getShows)

showRouter.get("/:movieId", getShow)

module.exports = showRouter;