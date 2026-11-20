const express = require('express');

const {
    isAdmin,
    getDashboardData,
    getAllShows,
    getAllBookings
} = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');
const protectAdmin = require('../middleware/auth');

const adminRouter = express.Router();

adminRouter.get(
    '/is-admin',
    protect,
    isAdmin
);

adminRouter.get(
    '/dashboard',
    protect,
    protectAdmin,
    getDashboardData
);

adminRouter.get(
    '/all-bookings',
    protect,
    protectAdmin,
    getAllBookings
);

adminRouter.get(
    '/shows',
    protect,
    protectAdmin,
    getAllShows
);

module.exports = adminRouter;