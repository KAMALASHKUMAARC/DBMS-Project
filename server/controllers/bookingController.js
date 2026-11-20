const Booking = require('../models/Booking');
const Show  = require('../models/Show');

// Function to check availability of selected seats for a movie
const checkSeatsAvailability = async (showId, selectedSeats)=>{
    try {
        const showData = await Show.findById(showId)
        if(!showData) return false;

        const occupiedSeats = showData.occupiedSeats || {};

        const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);
        return !isAnySeatTaken;    
    } catch(error) {
        console.log(error.message);
        return false;
    }
}

const createBooking = async (req,res)=>{
    try {
        const userId = req.user._id;
        const {showId, selectedSeats} = req.body;
        const {origin} = req.headers;

        // Check if the seat is available of the selected show
        const isAvailable = await checkSeatsAvailability(showId, selectedSeats)

        if(!isAvailable){
            return res.json({success: false, message: "Selected seats are not available"})
        }

        // Get the show details
        const showData = await Show.findById(showId).populate('movie');

        // Create a new Booking
        const booking = await Booking.create({
            user: userId,
            show: showId,
            amount: showData.showPrice * selectedSeats.length,
            bookedSeats: selectedSeats
        })

       showData.occupiedSeats = showData.occupiedSeats || {};

        selectedSeats.forEach(seat => {
            showData.occupiedSeats[seat] = true;
        });

        showData.markModified('occupiedSeats');
        await showData.save();

        showData.markModified('occupiedSeats');

        await showData.save();

        // Stripe Gateway Initialize

        res.json({success: true, message: 'booked successfully'})

    } catch(error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

const getOccupiedSeats = async (req,res)=>{
    try {
        const {showId} = req.params;
        const showData = await Show.findById(showId);

        const occupiedSeats = Object.keys(showData.occupiedSeats);

        res.json({success: true, occupiedSeats})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}
    const mockPayment = async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await Booking.findById(bookingId);

        if (!booking) {
        return res.json({ success: false, message: "Booking not found" });
        }

        booking.isPaid = true;
        booking.paymentLink = "mock-payment-success";

        await booking.save();

        res.json({ success: true, message: "Payment completed (mock)" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
    };

module.exports = {
    createBooking,
    getOccupiedSeats,
    mockPayment
};