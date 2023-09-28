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
    const currentPage = req.query.page
    const sort = req.query.sort
    const category = req.query.category
    const itemPerPage = 3

    if (!id) {
        if (!itemName) {
            try {
                let firstPipeline = []

                if (category) {
                    firstPipeline.push({ $match: { category: { $regex: new RegExp(category, 'i') } } })
                }

                firstPipeline.push({
                    $group: {
                        _id: null,
                        total: { $sum: 1 }
                    }
                });


                let allProducts = await ProductsModel.aggregate(firstPipeline);
                let totalCount = Math.ceil((allProducts[0]?.total || 1) / itemPerPage);


                let pipeline = [];

                if (sort) {
                    if (sort == "asc") {
                        pipeline.push({ $sort: { title: 1 } });
                    } else if (sort == "desc") {
                        pipeline.push({ $sort: { title: -1 } });
                    } else if (sort == "l2h") {
                        pipeline.push({ $sort: { price: 1 } });
                    } else {
                        pipeline.push({ $sort: { price: -1 } });
                    }
                }

                if (category) {
                    pipeline.push({ $match: { category: { $regex: new RegExp(category, 'i') } } });
                }

                pipeline.push({ $skip: (currentPage - 1) * itemPerPage });
                pipeline.push({ $limit: itemPerPage });

                let products = await ProductsModel.aggregate(pipeline);

                return res.status(200).send({ Products: products, "Total Pages": totalCount, "Current Page": currentPage, "Limit": itemPerPage })
            } catch (error) {
                console.error(error);
                return res.status(500).send({ "msg": "Internal server error" });
            }
        } else {
            try {
                const allProducts = await ProductsModel.aggregate([
                    { $match: { title: { $regex: new RegExp(itemName, 'i') } } }
                ]);

                let pipeline = [];

                if (sort) {
                    if (sort == "asc") {
                        pipeline.push({ $sort: { title: 1 } });
                    } else if (sort == "desc") {
                        pipeline.push({ $sort: { title: -1 } });
                    } else if (sort == "l2h") {
                        pipeline.push({ $sort: { price: 1 } });
                    } else {
                        pipeline.push({ $sort: { price: -1 } });
                    }
                }

                if (category) {
                    pipeline.push({ $match: { category: { $regex: new RegExp(category, 'i') } } });
                }

                pipeline.push({ $match: { title: { $regex: new RegExp(itemName, 'i') } } })
                pipeline.push({ $skip: (currentPage - 1) * itemPerPage })
                pipeline.push({ $limit: itemPerPage })

                const products = await ProductsModel.aggregate(pipeline);

                const totalCount = Math.ceil(allProducts.length / itemPerPage);

                return res.status(200).send({ Products: products, "Total Pages": totalCount, "Current Page": currentPage, "Limit": itemPerPage });
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