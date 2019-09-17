const express = require('express')
const route = express.Router()
const userController = require('../Controllers/user')
const auth = require('../Middlewares/auth')
route
    .post('/register/partner',userController.registerPartner)
module.exports = route