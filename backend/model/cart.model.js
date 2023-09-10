const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    title: String,
    email: String,
    price: Number,
    category: String,
    image: String,
    quantity: {
        type: Number,
        default: 1
    }
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
