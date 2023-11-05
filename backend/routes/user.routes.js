const express = require('express')
const UserRouter = express.Router()
const { middleware } = require('../middleware/user.middleware');
const { register, login, verify, placeOrder, getOrder, saveAddress, logout } = require('../controllers/user.controllers')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

UserRouter.post('/register', upload.single('avatar'), register)

UserRouter.get('/verify', middleware, verify)

UserRouter.post('/login', login)

UserRouter.get('/logout', middleware, logout)

UserRouter.post('/orders/place', middleware, placeOrder)

UserRouter.get('/orders', middleware, getOrder)

UserRouter.post('/address/save', middleware, saveAddress)

module.exports = { UserRouter }


