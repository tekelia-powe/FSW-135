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

//Get Issue by id
//Get issues by user id (profile page)
issueRouter.get("/user", (req, res, next) => {
  Issue.find(
      { user: req.user._id }, 
      (err, issues) => {
      if(err) {
          res.status(500)
          return next(err)
      }
      return res.status(200).send(issues)
  })
})

// // Get Issues by User
issueRouter.get("/user", (req, res, next) => {
    Issue.findOne(
      {'user': req.user._id},
      (err, issues) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(issues)
    })
  })

  //Get issues by user id ( )
issueRouter.get("/user/:userId", (req, res, next)=>{
  Issue.find(
      {user: req.params.userId},
      (err, issues) => {
          if(err) {
              res.status(500)
              return next(err)
          }
          return res.status(200).send(issues)
      })
})
  //add new issue
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


//Update Issues
issueRouter.put("/:issueId", (req, res, next) => {
  Issue.findOneAndUpdate(
      {_id: req.params.issueId, user: req.user._id},
      req.body,
      {new: true},
      (err, updatedIssue) => {
          if(err){
              res.status(500)
              return next(err)
          }
          return res.status(200).send(updatedIssue)
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

 

  //Upvote
issueRouter.put("/upvotes/:issueId", (req, res, next)=> {
  Issue.findOneAndUpdate(
      {_id: req.params.issueId },
      {$inc: {upVotes: 1} },
      {new: true},      
      (err, issue) => {
          if(err) {
              res.status(500)
              return next(err)
          }
          console.log("The type of req.params.issueId is a " + typeof req.params.issueId)
          console.log("Req.params.issueId is a " + req.params.issueId)
          console.log(issue)

          if(!issue.upVoters.includes(req.user._id)) {
              Issue.findOneAndUpdate(
                  {_id: req.params.issueId},
                  {$push: {upVoters: req.user._id}},
                  {new: true},
                  (err, issue) => {
                      if(err) {
                          res.status(500)
                          return next(err)
                      }
                      console.log(issue)
                      return res.status(200).send(issue)
                  })



              


          }
          else {
              res.status(500)
              Issue.findOneAndUpdate(
                  {_id: req.params.issueId},
                  {$inc: {upVotes: -1}},
                  {new: true},
                  (err, issue) => {
                      if(err) {
                          res.status(500)
                          return next(err)
                      }
                      return 
                  }
              )
              return next(new Error("You already voted!"))
          }
           
      }
  )



})

//Downvote
issueRouter.put("/downvotes/:issueId", (req, res, next)=> {
Issue.findOneAndUpdate(
  {_id: req.params.issueId },
  {$inc: {downVotes: 1} },
  {new: true},      
  (err, issue) => {
      if(err) {
          res.status(500)
      }
      return res.status(200).send(issue)
  }
)
})

module.exports = issueRouter