const Booking = require('../models/Booking');
const Show = require('../models/Show');
const User = require('../models/User');

// API to check if user is admin
const isAdmin = async (req, res) => {
        try {
            res.json({
                success: true,
                isAdmin: req.user.role === 'admin'
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }


// API to get dashboard data for admin
const getDashboardData = async (req,res)=>{
    try {
        const bookings = await Booking.find({isPaid: true});
        const activeShows = await Show.find({showDateTime: {$gte: new Date()}}).populate('movie');

        const totalUser = await User.countDocuments();

        const dashboardData = {
            totalBookings: bookings.length,
            totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
            activeShows,
            totalUser
        }
        res.json({success: true, dashboardData})
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message})
    }
}

const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({
      showDateTime: { $gte: new Date() }
    })
      .populate('movie')
      .sort({ showDateTime: 1 });

    const bookings = await Booking.find({ isPaid: true });

    const bookingMap = {};

    bookings.forEach((b) => {
      const showId = b.show.toString();

      if (!bookingMap[showId]) {
        bookingMap[showId] = [];
      }

      bookingMap[showId].push(b);
    });

    const enrichedShows = shows.map((show) => {
      const showBookings = bookingMap[show._id] || [];

      return {
        ...show._doc,
        totalBookings: showBookings.length,
        earnings: showBookings.reduce((acc, b) => acc + b.amount, 0)
      };
    });

    res.json({
      success: true,
      shows: enrichedShows
    });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all bookings
const getAllBookings = async (req,res)=>{
    try{
        const bookings = await Booking.find({}).populate('user').populate({
            path: 'show',
            populate: {path: "movie"}
        }).sort({createdAt: -1});
        res.json({success: true, bookings})
    } catch(error) {
        console.error(error);
        res.json({success: false, message: error.message})
    }
}

module.exports = {
    isAdmin,
    getDashboardData,
    getAllShows,
    getAllBookings
}