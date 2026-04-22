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


exports.createEvent = aync(req, res) => {
    const
}