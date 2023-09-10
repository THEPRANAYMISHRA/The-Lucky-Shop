const express = require('express')
const UserRouter = express.Router()
const { middleware } = require('../middleware/user.middleware');
const { register, login, verify } = require('../controllers/user.controllers')

UserRouter.post('/register', register)

UserRouter.get('/verify', middleware, verify)

UserRouter.post('/login', login)

module.exports = { UserRouter }


