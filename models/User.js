const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: {
        type: [String], //list of restaraunts ids
        required: false,
    },
}, {collection: 'usersCollection'})

module.exports = mongoose.model('user', UserSchema)