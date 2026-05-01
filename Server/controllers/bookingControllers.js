const Booking = require("../models/Booking")
const OTP = require('../models/OTP')
const Event = require("../models/event")
const {
    sendOTPEmail,
    sendBookingEmail
} = require("../utils/email")

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
exports.sendBookingOTP = async(req, res) => {
    const opt = generateOTP();
    await OTP.findOneAndDelete({ email: req.user.email, action: "event_booking" }) //delete existed otp
    await OTP.create({ email: req.user.email, otp: opt, action: 'event_booking' }) //new otp sent
    await sendOTPEmail(req.user.email, opt, "event_booking")
    res.json({ message: "OTP sent to email" })
}

exports.bookEvent = async(req, res) => {
    const { eventId, otp } = req.body;

    const otpRecord = await OTP.findOne({ email: req.user.email, otp, action: "evet_booking" })
    if (!otpRecord) {
        return res.status(400).json({ error: "invalid or expire otp" })
    }
    const event = await Event.findById(eventId)
    if (!event) {
        return res.status(404).json({ error: "Event not found" })
    }
    if (event.totalSeats <= 0) {
        return res.status(400).json({ error: "not seats available" })
    }

    const existingBooking = await Booking.findOne({ userId: req.user._id, eventId })
    if (existingBooking) {
        return res.status(400).json({ error: "you have already booked this event" })
    }
    const booking = await Booking.create({
        userId: req.user._Id,
        eventId,
        status: 'pending',
        paymentStatus: "non_paid",
        amount: event.ticketPrice
    })
    await OTP.deleteMany({ email: req.user.email, action: "event_booking" })
    res.status(201).json({ message: "booking created please check your email" })
}

exports.confirmBooking = async(req, res) => {
    const paymentStatus = req.body.paymentStatus; // 'paid' or 'not_paid'
    if (!['paid', 'non_paid'].includes(paymentStatus)) {
        return res.status(400).json({ error: 'Invalid payment status' })
    }
    const booking = await Booking.findById(req.params.id).populate('userId').populate('eventId');
    if (!booking)
        return res.status(404).json({ message: 'Booking not found' });
    const event = await Event.findById(booking.eventId._id);
    if (event.availableSeats <= 0) {
        return res.status(400).json({ message: 'No seats available to confirm this booking' });
    }

    booking.status = 'confirmed';
    if (paymentStatus) {
        booking.paymentStatus = paymentStatus;
    }
    await booking.save();

    event.availableSeats -= 1;
    await event.save();

    await sendBookingEmail(req.user.email, event.title, booking._id)

    res.json({ message: "booking confimed" })
}

exports.getmyBookings = async(req, res) => {
    const bookings = await Booking.find({ userId: req.user._id }).populate('eventId')
    res.json(bookings)
}

exports.cancelBooking = async(req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (!booking)
        return res.status(404).json({ message: 'Booking not found' });
    if (booking.userId.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' });
    }

    booking.status = 'cancelled';
    await booking.save();

    if (booking.status == 'confirmed') {
        const event = await Event.findById(booking.eventId._id);
        event.totalSeats += 1;
        await event.save()
    }
    await booking.remove();
    res.json({ message: "booking cancelled" })
}