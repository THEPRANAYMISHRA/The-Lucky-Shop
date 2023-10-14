var jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { UsersModel } = require('../model/user.model');

const register = async (req, res) => {
    const avatar = req.file;
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).send({ "msg": "Fill all the fields!" });
    } else {
        let newUser = new UsersModel({ name, email, password });
        newUser.avatar = `${avatar.filename}`;

        try {
            await newUser.save();
            return res.status(201).send({ "msg": "User created successfully!" });
        } catch (error) {
            return res.status(500).send({ "msg": "Error creating user" });
        }
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send({ "msg": "Fill all the field!" })
    } else {
        let users = await UsersModel.aggregate([{ $match: { email: email } }, { $limit: 1 }]);
        let user = users[0]
        if (!user) {
            return res.status(404).send({ "msg": "No such user found!" })
        } else {
            if (password == user.password) {
                var token = jwt.sign({ email: email, name: user.name }, 'shhhhh');
                const avatarPath = path.join(__dirname, '../uploads', user.avatar);
                const imageData = fs.readFileSync(avatarPath);
                const base64Image = imageData.toString('base64');
                return res.status(200).send({ token: token, msg: "login successful!", name: user.name, avatar: base64Image || null })
            } else {
                return res.status(400).send({ "msg": "wrong password" })
            }
        }
    }
}

const verify = (req, res) => {
    const name = req.body.name
    res.status(200).send({ "msg": "valid user", name: name })
}


const placeOrder = async (req, res) => {
    const { email, orders } = req.body;
    try {
        let user = await UsersModel.findOne({ email });

        if (user) {
            orders.forEach((ele) => {
                user.orders.push(ele);
            });

            await user.save();

            return res.status(201).send("Orders saved successfully");
        } else {
            return res.status(404).send("User not found");
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send("Orders couldn't be saved");
    }
};



const getOrder = async (req, res) => {
    const { email } = req.body;

    try {
        let user = await UsersModel.findOne({ email }).populate('orders.product');

        if (user) {
            return res.status(201).send(user);
        } else {
            return res.status(404).send("User not found");
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send("Orders couldn't be fetched");
    }
};

const saveAddress = async (req, res) => {
    const { email, address } = req.body;

    try {
        let user = await UsersModel.findOne({ email })

        if (user) {
            user.addresses.push(address);
            await user.save();
            return res.status(201).send("address is saved in profile");
        } else {
            return res.status(404).send("User not found");
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send("couldn't save address!");
    }
};


module.exports = { register, login, verify, placeOrder, getOrder, saveAddress }