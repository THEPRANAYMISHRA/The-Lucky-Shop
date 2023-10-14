const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    avatar: { type: String },
    name: {
        type: String, required: [true, 'Name is required']
    },
    email: {
        type: String, unique: true
    },
    password: {
        type: String, required: [true, "Password field can't be empty"]
    },
    addresses: [String],
    orders: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 },
            date: { type: Date, default: Date.now },
            name: { type: String, },
            address: { type: String, },
            pincode: { type: Number, },
            phone: { type: Number, },
        }
    ]
})

const UsersModel = mongoose.model('User', userSchema)

module.exports = { UsersModel }