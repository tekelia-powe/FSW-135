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
    upVotes:{
        type: Number,
    },
    downVotes: {
        type: Number,
      },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      upVoters: {
        type: Array
      },
      downVoters: {
        type: Array
      },
      comments: {
        type: Array
      }
    
})

module.exports = mongoose.model('Issue', issueSchema)