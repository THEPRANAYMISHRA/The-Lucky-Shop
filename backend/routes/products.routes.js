const express = require('express')
const ProductRouter = express.Router()
const { addProduct, deleteProduct, getProducts } = require("../controllers/products.controller")

ProductRouter.post('/add', addProduct);
ProductRouter.get('/', getProducts)
ProductRouter.delete('/delete', deleteProduct)

module.exports = { ProductRouter }