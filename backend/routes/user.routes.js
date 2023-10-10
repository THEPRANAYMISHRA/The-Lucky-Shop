const express = require('express')
const UserRouter = express.Router()
const { middleware } = require('../middleware/user.middleware');
const { register, login, verify, placeOrder, getOrder } = require('../controllers/user.controllers')
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

UserRouter.post('/placeorder', middleware, placeOrder)

UserRouter.get('/getorders', middleware, getOrder)

module.exports = { UserRouter }


