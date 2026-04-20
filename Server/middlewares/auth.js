const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { truncates } = require('bcryptjs');

//to check user is login or not
const protect = async(req, res, next) => {
    let token = req.headers.authorization && req.headers.authorization.startWith('Bearer') ? req.headers.authorization.split(' ')[1] : null
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password')
            if (!req.user) {
                return res.status(401).json({ mesage: "not authorized " })
            }
            next();
        } catch (error) {
            return res.status(401).json({ mesage: "not authorized " })
        }
    }
}


const admin = (req, res, next) => {
    if (req.user && req.user.role == 'admin') {
        next();
    } else {
        return res.status(403).json({ mesage: "forbidden" })

    }
}


module.exports = { admin, protect }