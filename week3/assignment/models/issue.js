const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Issue schema
const issueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User", 
        required: true
    }
})

module.exports = mongoose.model('Issue', issueSchema)