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
        default: false
    },
    signup_date: {
        type: Date,
        default: Date.now
    },
    mod_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)