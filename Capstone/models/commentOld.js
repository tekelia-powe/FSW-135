const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Comment schema
const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    // parent_comment_id: {
    //     type: String,
        
    // },
    // comment_date: {
    //     type: Date,
    //     default: Date.now
    // },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },

    // issue: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Issue", 
    //     required: true
    // }
})

module.exports = mongoose.model('Comment', commentSchema)