var jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const bcrypt = require("bcrypt")
const saltRounds = 10;
const { UsersModel } = require('../model/user.model');
const { blacklistModel } = require('../model/blacklist.model');


const register = async (req, res) => {
    const avatar = req.file;
    // fs.readFile(avatar.path, (err, data) => {
    //     if (err) throw err;
    //     const base64String = data.toString('base64');
    //     console.log(base64String);
    // });

    const { name, email, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).send({ "msg": "Fill all the fields!" });
    } else {
        try {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    return res.status(400).send({ "msg": "Failed to create user!" });
                } else {
                    let newUser = new UsersModel({ name, email, password: hash });
                    newUser.avatar = `${avatar.filename}`;
                    await newUser.save();
                    return res.status(201).send({ "msg": "User created successfully!" });
                }
            });
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
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    return res.status(400).send({ "msg": "wrong password" })
                } else {
                    var token = jwt.sign({ email: email, name: user.name }, process.env.jwtkey);
                    const avatarPath = path.join(__dirname, '../uploads', user.avatar);
                    const imageData = fs.readFileSync(avatarPath);
                    const base64Image = imageData.toString('base64');
                    return res.status(200).send({ token: token, msg: "login successful!", name: user.name, avatar: base64Image || null })
                }
            });
        }
    }
}

const logout = async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(400).send({ "msg": "Invalid option!" });
    } else {
        try {
            const newBlacklistEntry = new blacklistModel({ token });
            await newBlacklistEntry.save();
            return res.status(200).send({ "msg": "Logged out successfully!" });
        } catch (error) {
            return res.status(500).send({ "msg": "Logged out failed!" });
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


module.exports = { register, login, logout, verify, placeOrder, getOrder, saveAddress }