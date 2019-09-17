const express = require('express')
const route = express.Router()
const userController = require('../Controllers/user')
const serviceController = require('../Controllers/services')
const auth = require('../Middlewares/auth')
route
    .post('/register/partner',userController.registerPartner)
    .post('/register/user', userController.registerUser)
    .post('/login/partner',userController.loginPartner)
    .post('/login/user', userController.loginUser)
    .get('/services/:id',serviceController.getServices)
    .post('/services',serviceController.insertServices)
module.exports = route