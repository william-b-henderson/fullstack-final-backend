const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    savedOccasions: {
        type: [String], //list of occasion ids
        required: false,
    },
}, {collection: 'usersCollection'})

module.exports = mongoose.model('user', UserSchema)