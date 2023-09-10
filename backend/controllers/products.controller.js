const ProductsModel = require('../model/products.model')

const addProduct = async (req, res) => {
    const { title, price, description, category, image, rating } = req.body

    try {
        const newProduct = new ProductsModel({ title, price, description, category, image, rating });
        await newProduct.save();
        return res.status(201).send({ "msg": "New product is added successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ "msg": "Internal server error" });
    }
}

const deleteProduct = async (req, res) => {
    const _id = req.query.id

    if (!_id) {
        return res.status(400).send({ "msg": "Provide the id of product" })
    } else {
        try {
            await ProductsModel.findByIdAndDelete(_id)
            return res.send({ "msg": "Product removed" })
        } catch (error) {
            return res.send({ "msg": "No such product found!" })
        }
    }
}

const getProducts = async (req, res) => {
    const id = req.query.id
    const itemName = req.query.item

    if (!id) {
        if (!itemName) {
            try {
                let products = await ProductsModel.find()
                return res.status(200).send(products)
            } catch (error) {
                console.error(error);
                return res.status(500).send({ "msg": "Internal server error" });
            }
        } else {
            try {
                let products = await ProductsModel.aggregate([{ $match: { title: { $regex: new RegExp(itemName, 'i') } } }]);
                return res.status(200).send(products)
            } catch (error) {
                console.error(error);
                return res.status(500).send({ "msg": "Internal server error" });
            }
        }

    } else {
        try {
            let product = await ProductsModel.findById(id)
            if (!product) {
                return res.status(404).send({ "msg": "No such product found!" })
            } else {
                return res.status(200).send(product)
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ "msg": "Internal server error" });
        }
    }
}


module.exports = { addProduct, deleteProduct, getProducts }