const express = require('express')
const route = express.Router()
const userController = require('../Controllers/user')
const auth = require('../Middlewares/auth')
route
    .get('/',userController.getBook)
    .post('/register/user', userController.registerUser)
module.exports = route