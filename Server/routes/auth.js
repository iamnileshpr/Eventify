//authentication related

import express from 'express'
const { router, login, verifyOtp } = require('../controllers/authControllers.js')


router.post('/resister', register);
router.post('/login', login);
router.post('/verifyOtp', verifyOtp);