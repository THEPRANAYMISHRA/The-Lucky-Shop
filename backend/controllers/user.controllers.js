var jwt = require('jsonwebtoken');
const { UsersModel } = require('../model/user.model');

const register = async (req, res) => {
    const { name, email, password } = req.body

    if (!email || !name || !password) {
        return res.status(400).send({ "msg": "Fill all the field!" })
    } else {
        let newUser = new UsersModel({ name, email, password })
        await newUser.save()
        return res.status(201).send({ "msg": "User created successfully!" })
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
                return res.status(200).send({ token: token, msg: "login successful!", name: user.name })
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

module.exports = { register, login, verify }