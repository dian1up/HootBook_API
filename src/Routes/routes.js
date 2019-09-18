const express = require('express')
const route = express.Router()
const userController = require('../Controllers/user')
const bookingController = require('../Controllers/booking')
const serviceController = require('../Controllers/services')
const redis = require('../Middlewares/redis')
const auth = require('../Middlewares/auth')
route
    .post('/register/partner',userController.registerPartner)
    .post('/register/user', userController.registerUser)
    .post('/login/partner',userController.loginPartner)
    .post('/login/user', userController.loginUser)
    .post('/booking', auth.verifyTokenMiddleware, bookingController.book)
    .patch('/booking/:bookingId', auth.verifyTokenMiddleware, bookingController.checking_out)
    .get('/booking/', auth.verifyTokenMiddleware, redis.getBookings, bookingController.getAllBookings)
    .get('/booking/:hotelId', auth.verifyTokenMiddleware, redis.getBookingsOnHotel, bookingController.getAllBookingsOnHotel)
    .get('/services/:id', auth.verifyTokenMiddleware, redis.getServices,serviceController.getServices)
    .post('/services', auth.verifyTokenMiddleware,serviceController.insertServices)
    .delete('/services/:id', auth.verifyTokenMiddleware,serviceController.deleteServices)
    .patch('/services', auth.verifyTokenMiddleware,serviceController.updateServices)
    .patch('/user/:id', userController.updateUser)
module.exports = route