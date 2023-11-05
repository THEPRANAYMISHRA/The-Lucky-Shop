const CartModel = require('../model/cart.model')

const addProduct = async (req, res) => {
    const { title, email, price, category, image, quantity } = req.body

    let isProductAlreadyInCart = await CartModel.findOne({ title, email })

    if (isProductAlreadyInCart) {
        return res.status(409).send({ 'msg': 'product already in cart' });
    } else {
        try {
            const newProduct = new CartModel({ title, email, price, category, image, quantity });
            await newProduct.save();
            return res.status(201).send({ "msg": "New product is added successfully!" });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ "msg": "Internal server error" });
        }
    }
}

const getProducts = async (req, res) => {
    const email = req.body.email
    try {
        let products = await CartModel.aggregate([{ $match: { email: { $regex: new RegExp(email, 'i') } } }]);
        return res.status(200).send(products)
    } catch (error) {
        console.error(error);
        return res.status(500).send({ "msg": "Internal server error" });
    }
}

const updateQuantity = async (req, res) => {
    const email = req.body.email
    const itemId = req.body.itemId
    const itemQuantity = req.body.quantity

    console.log(email, itemId)
    try {
        await CartModel.findByIdAndUpdate(itemId, { quantity: itemQuantity })
        let product = await CartModel.findById(itemId)
        return res.status(200).send(product);
    } catch (error) {
        return res.send(error)
    }
}

const deleteProduct = async (req, res) => {
    const _id = req.query.id

    if (!_id) {
        return res.status(400).send({ "msg": "Provide the id of product" })
    } else {
        try {
            await CartModel.findByIdAndDelete(_id)
            return res.send({ "msg": "Product removed" })
        } catch (error) {
            return res.send({ "msg": "No such product found!" })
        }
    }
}

const clearCart = async (req, res) => {
    const email = req.body.email

    try {
        await CartModel.deleteMany({ email: email })
        return res.send({ "msg": "cart cleared" })
    } catch (error) {
        return res.send({ "msg": "failed to clear cart!" })
    }
}


module.exports = { addProduct, deleteProduct, getProducts, updateQuantity, clearCart }