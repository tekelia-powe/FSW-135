const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment.js')

// Get All
commentRouter.get('/', (req, res, next) => {
  Comment.find((err, comments) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comments)
  })
})

// Get One by ID
commentRouter.get('/:commentId', (req, res, next) => {
    Comment.find({_id: req.params.commentId},(err, comments) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(comments)
    })
  })
  
// // Get Comments by User
commentRouter.get('/:userId', (req, res, next) => {
    Comment.find({user: req.params.userId},(err, comments) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(comments)
    })
  })

// Add new comment
commentRouter.post('/', (req, res, next) => {
  const newComment = new Comment(req.body)
  newComment.save((err, savedComment) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedComment)
  })
})

// Add many comments
commentRouter.post('/manycomments', (req, res, next) => {
  const Comments = req.body
  const newComment = new Comment(Comments)
  Comment.insertMany(Comments, (err, savedComment) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedComment)
  })
})

//Update Comment
commentRouter.put("/:commentId", (req, res, next) => {
    Comment.findOneAndUpdate(
      { _id: req.params.commentId},
      req.body,
      {new: true},
      (err, updatedComment) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedComment)
      }
    )  
  })


//Delete Comment

commentRouter.delete("/:commentId", (req, res, next) => {
    Comment.findOneAndDelete(
      {_id: req.params.commentId}, 
      (err, deletedItem) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedItem._id} from the database`)
      }
    )
  })

 
  
  

module.exports = commentRouter