const express = require('express')
const userRouter = express.Router()
const User = require('../models/user.js')

// Get All
userRouter.get('/', (req, res, next) => {
  User.find({},(err, users) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(users)
  })
})

// Get One by ID
userRouter.get('/:userId', (req, res, next) => {
    User.find({_id: req.params.userId},(err, users) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(users)
    })
  })
  
// // Get Users by User
userRouter.get('/:userId', (req, res, next) => {
    User.find({user: req.params.userId},(err, users) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(users)
    })
  })

// Add new user
userRouter.post('/', (req, res, next) => {
  const newUser = new User(req.body)
  newUser.save((err, savedUser) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedUser)
  })
})

// Add many users
userRouter.post('/manyusers', (req, res, next) => {
  const Users = req.body
  const newUser = new User(Users)
  User.insertMany(Users, (err, savedUser) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedUser)
  })
})

//Update User
userRouter.put("/:userId", (req, res, next) => {
    User.findOneAndUpdate(
      { _id: req.params.userId},
      req.body,
      {new: true},
      (err, updatedUser) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedUser)
      }
    )  
  })


//Delete User

userRouter.delete("/:userId", (req, res, next) => {
    User.findOneAndDelete(
      {_id: req.params.userId}, 
      (err, deletedItem) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedItem._id} from the database`)
      }
    )
  })


module.exports = userRouter