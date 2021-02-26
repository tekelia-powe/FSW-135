const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')

// Middleware (for every request) //
app.use(express.json()) 
app.use(morgan('dev')) 

// Connect to DB
mongoose.connect('mongodb://localhost:27017/rockTheVoteDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log('Connected to the DB')
)

app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))

// Routes //
app.use('/api/comment', require('./routes/commentRouter.js'))
app.use('/api/user', require('./routes/userRouter.js'))
app.use('/api/issue', require('./routes/issueRouter.js'))
app.use('/api/vote', require('./routes/voteRouter.js'))


// Error handler
app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "Unauthorized Error"){
    res.status(err.status)
 }
  return res.send({errMsg: err.message})
})

// Server Listen //
app.listen(9000, () => {
  console.log('The server is running on Port 9000')
})