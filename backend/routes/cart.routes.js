const express = require('express')
const CartRouter = express.Router()
const { addProduct, deleteProduct, getProducts, updateQuantity } = require("../controllers/cart.controller")

CartRouter.post('/add', addProduct);
CartRouter.get('/', getProducts)
CartRouter.delete('/delete', deleteProduct)
CartRouter.patch('/update', updateQuantity)

module.exports = { CartRouter }