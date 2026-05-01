const express = require('express')
const router = express.Router();
const { admin, protect } = require('../middlewares/auth')
const {
    getEventById,
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent

} = require('../controllers/eventControllers')

//get all routes

router.get('/', getAllEvents);

//get event by id
router.get('/:id', getEventById);

//create event (admin only)
router.post('/', protect, admin, createEvent)

//update event

router.put('/:id', protect, admin, updateEvent)

//Delete event(admin only)

router.delete('/:id', protect, admin, deleteEvent)

module.exports = router;