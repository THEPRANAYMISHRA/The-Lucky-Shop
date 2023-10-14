const express = require('express')
const CartRouter = express.Router()
const { addProduct, deleteProduct, getProducts, updateQuantity, clearCart } = require("../controllers/cart.controller")

CartRouter.post('/add', addProduct);

CartRouter.get('/', getProducts);

CartRouter.delete('/delete', deleteProduct);

CartRouter.delete('/clear', clearCart);

CartRouter.patch('/update', updateQuantity);


module.exports = { CartRouter }