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
    .patch('/edit/partner', auth.verifyTokenMiddleware,userController.updatePartner)
    .get('/services/:id', auth.verifyTokenMiddleware,serviceController.getServices)
    .get('/services', serviceController.getServices)
    .post('/services', auth.verifyTokenMiddleware,serviceController.insertServices)
    .delete('/services/:id', auth.verifyTokenMiddleware,serviceController.deleteServices)
    .patch('/services', auth.verifyTokenMiddleware,serviceController.updateServices)
module.exports = route