const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Votes schema
const voteSchema = new Schema({
    vote: {
        type: Number,
        default: 0,
        required: true
    },
    vote_date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment", 
        required: true
    }
})

module.exports = mongoose.model('Vote', voteSchema)