const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Issue schema
const issueSchema = new Schema({
    description: {
        type: String,
        required: true
    }
   
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User", 
    //     required: true
    // },
    
})

module.exports = mongoose.model('Issue', issueSchema)