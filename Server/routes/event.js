const express = require('express')
const router = express.Router();
const { admin, protect } = require('../middlewares/auth')

//get all routes

router.get('/', getAllevents);

//get event by id
router.get('/:id', getEventById);

//create event (admin only)
router.post('/', protect, admin, creatEvent)

//update event

router.put('/:id', protect, admin, updateEvent)

//Delete event(admin only)

router.delete(':id' / protect, admin, deleteEvent)

module.exports = router;