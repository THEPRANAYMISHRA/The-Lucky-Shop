const express = require('express');
const jwt = require('jsonwebtoken');

const middleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Please provide a valid token" });
    }

    try {
        const decoded = jwt.verify(token, 'shhhhh');
        if (decoded) {
            req.body.name = decoded.name
            req.body.email = decoded.email
            next();
        } else {
            return res.status(400).json({ msg: "Unauthorized user!" });
        }
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = { middleware };
