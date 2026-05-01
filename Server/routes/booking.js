const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middlewares/auth');

const {
    bookEvent,
    sendBookingOTP,
    getmyBookings,
    confirmBooking,
    cancelBooking
} = require('../controllers/bookingControllers');

// create booking
router.post('/', protect, bookEvent);

// send OTP
router.post('/sendOTP', protect, sendBookingOTP);

// get my bookings
router.get('/my', protect, getmyBookings);

// confirm booking (admin)
router.put('/:id/confirm', protect, admin, confirmBooking);

// delete booking
router.delete('/:id', protect, cancelBooking);

module.exports = router;