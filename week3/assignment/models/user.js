const mongoose = require('mongoose')
const Schema = mongoose.Schema

// User schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    loggedIn: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)