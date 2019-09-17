const express = require('express')
const route = express.Router()
const userController = require('../Controllers/user')
const auth = require('../Middlewares/auth')
route
    .post('/register/partner',userController.registerPartner)
    .post('/register/user', userController.registerUser)
    .post('/login/partner',userController.loginPartner)
    .post('/login/user', userController.loginUser)
module.exports = route