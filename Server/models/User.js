const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        uniquee: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], //who can access
        default: 'user'
    },
    isvarified: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', UserSchema);