const express = require('express')
const voteRouter = express.Router()
const Vote = require('../models/votes.js')

// Get All
voteRouter.get('/', (req, res, next) => {
  Vote.find((err, votes) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(votes)
  })
})

// Get One by ID
voteRouter.get('/:voteId', (req, res, next) => {
    Vote.find({_id: req.params.voteId},(err, votes) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(votes)
    })
  })
  
// // Get Votes by User
voteRouter.get('/:userId', (req, res, next) => {
    Vote.find({user: req.params.userId},(err, votes) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(votes)
    })
  })

// Add new votes
voteRouter.post('/', (req, res, next) => {
  const newVote = new Vote(req.body)
  newVote.save((err, savedVote) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedVote)
  })
})

// Add many votes
voteRouter.post('/manyissues', (req, res, next) => {
  const Votes = req.body
  const newVote = new Vote(Votes)
  Vote.insertMany(Votes, (err, savedVote) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedVote)
  })
})

//Update Vote
voteRouter.put("/:voteId", (req, res, next) => {
    Vote.findOneAndUpdate(
      { _id: req.params.voteId},
      req.body,
      {new: true},
      (err, updatedVote) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedVote)
      }
    )  
  })


//Delete Vote

voteRouter.delete("/:voteId", (req, res, next) => {
    Vote.findOneAndDelete(
      {_id: req.params.voteId}, 
      (err, deletedItem) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedItem._id} from the database`)
      }
    )
  })

   //up vote
   voteRouter.put('/like/:voteID', (req, res, next) => {
    Vote.findOneAndUpdate(
      { _id: req.params.voteID },
      { $inc: { votes: 1 }},
      { new: true },
      (err, updatedVote) => {
        if(err) {
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedVote)
      }
    )
  })


  //down vote
  voteRouter.put('/dislike/:voteID', (req, res, next) => {
    Vote.findOneAndUpdate(
      { _id: req.params.voteID },
      { $inc: { votes: -1 }},
      { new: true },
      (err, updatedVote) => {
        if(err) {
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedVote)
      }
    )
  })

module.exports = voteRouter