const mongoose = require('mongoose')

const blacklistSchema = mongoose.Schema({
    token: { type: String },
    createdAt: { type: Date, expires: 259200, default: Date.now }
});

const blacklistModel = mongoose.model('Blacklist', blacklistSchema)

module.exports = { blacklistModel }