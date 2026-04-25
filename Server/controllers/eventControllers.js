const Event = require('../models/event')

exports.getAllEvents = async(req, res) => {
    try {

        const filters = {};
        if (req.query.category) {
            filters.category = req.query.category;
        }
        if (req.query.ticketPrice) {
            filters.ticketPrice = req.query.ticketPrice;
        }
        const event = await Event.find(filters);
        res.json(event)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getEventById = async(req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'error not found' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.createEvent = async(req, res) => {
    const { title, description, Date, location, cateogry, totalSeats, ticketPrice, imageUrl } = req.body
    try {
        const event = await Event.create({
            title,
            description,
            Date,
            location,
            cateogry,
            totalSeats,
            ticketPrice,
            imageUrl,
        })
        res.status(201).json(event)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.updateEvent = async(req, res) => {
    const { title, description, Date, location, cateogry, totalSeats, ticketPrice, imageUrl } = req.body;
    try {
        const event = await Event.findByIdAndUpdates(req.params.id, {
            title,
            description,
            Date,
            location,
            cateogry,
            totalSeats,
            ticketPrice,
            imageUrl,
        }, { new: true })
        if (!event) {
            return res.status(404).json({ error: "event not found" })
        }
        res.json(event)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.deleteEvent = async(req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "event not found" })
        }
        res.json({ message: "event deleted succfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}