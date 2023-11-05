const express = require('express');
const jwt = require('jsonwebtoken');
const { blacklistModel } = require('../model/blacklist.model');

const middleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Please provide a token" });
    } else {
        try {
            let isThisTokenIsBlackListed = await blacklistModel.findOne({ token })
            console.log(isThisTokenIsBlackListed);
            if (isThisTokenIsBlackListed) {
                return res.status(401).json({ error: "Token already expired" });
            } else {
                const decoded = jwt.verify(token, process.env.jwtkey);
                if (decoded) {
                    req.body.name = decoded.name
                    req.body.email = decoded.email
                    next();
                } else {
                    return res.status(400).json({ msg: "Unauthorized user!" });
                }
            }
        } catch (error) {
            return res.status(400).json({ msg: error });
        }
    }
};

module.exports = { middleware };
