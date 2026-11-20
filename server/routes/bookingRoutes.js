const {
   createBooking,
   getOccupiedSeats,
   mockPayment
} = require('../controllers/bookingController');
const express = require('express');
const protect = require('../middleware/authMiddleware');
const bookingRouter = express.Router();

bookingRouter.post('/create',protect,  createBooking);
bookingRouter.get('/seats/:showId', getOccupiedSeats);
bookingRouter.post("/mock-pay", protect, mockPayment);

module.exports = bookingRouter;