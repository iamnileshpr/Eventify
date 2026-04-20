const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('../Server/routes/auth');
const event = require('./routes/event.js')
const booking = require('./routes/booking.js')
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/event', event)
app.use('/api/events', booking)

// connect to database
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('connected to mongodb');
    })
    .catch((error) => {
        console.error('error connecting to database:', error);
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on the port ${PORT}`);
});