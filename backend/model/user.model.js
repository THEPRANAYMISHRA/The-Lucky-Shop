const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String, required: [true, 'Name is required']
    },
    email: {
        type: String, unique: true
    },
    password: {
        type: String, required: [true, "Password field can't be empty"]
    }
})

const UsersModel = mongoose.model('User', userSchema)

module.exports = { UsersModel }