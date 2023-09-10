const express = require('express')
const CartRouter = express.Router()
const { addProduct, deleteProduct, getProducts } = require("../controllers/cart.controller")

CartRouter.post('/add', addProduct);
CartRouter.get('/', getProducts)
CartRouter.delete('/delete', deleteProduct)

module.exports = { CartRouter }