const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/issue.js')

// Get All
issueRouter.get('/', (req, res, next) => {
  Issue.find((err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

// // Get One by ID
// issueRouter.get('/:issueId', (req, res, next) => {
//     Issue.findOne({_id: req.params.issueId},(err, issues) => {
//       if(err){
//         res.status(500)
//         return next(err)
//       }
//       return res.status(200).send(issues)
//     })
//   })
  

// // Get Issues by User
issueRouter.get('/user', (req, res, next) => {
    Issue.findOne({user: req.user._id},(err, issues) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(issues)
    })
  })

  issueRouter.post('/', (req, res, next) => {
    req.body.user = req.user._id
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(savedIssue)
    })
  })

// Add new issue
// issueRouter.post('/', (req, res, next) => {
//   req.body.user = req.user._id
//   const newIssue = new Issue(req.body)
//   newIssue.save((err, savedIssue) => {
//     if(err){
//       res.status(500)
//       return next(err)
//     }
//     return res.status(201).send(savedIssue)
//   })
// })



// Add many issues
issueRouter.post('/manyissues', (req, res, next) => {
  const Issues = req.body
  const newIssue = new Issue(Issues)
  Issue.insertMany(Issues, (err, savedIssue) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedIssue)
  })
})

//Update Issue
issueRouter.put("/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate(
      { _id: req.params.issueId},
      req.body,
      {new: true},
      (err, updatedIssue) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedIssue)
      }
    )  
  })


//Delete Issue

issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.findOneAndDelete(
      {_id: req.params.issueId}, 
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
   issueRouter.put('/like/:issueID', (req, res, next) => {
    Issue.findOneAndUpdate(
      { _id: req.params.issueID },
      { $inc: { votes: 1 }},
      { new: true },
      (err, updatedIssue) => {
        if(err) {
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedIssue)
      }
    )
  })


  //down vote
  issueRouter.put('/dislike/:issueID', (req, res, next) => {
    Issue.findOneAndUpdate(
      { _id: req.params.issueID },
      { $inc: { votes: -1 }},
      { new: true },
      (err, updatedIssue) => {
        if(err) {
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedIssue)
      }
    )
  })

module.exports = issueRouter