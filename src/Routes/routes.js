const express = require('express')
const route = express.Router()
const userController = require('../Controllers/user')
const auth = require('../Middlewares/auth')
route
    .get('/',userController.getBook)
module.exports = route