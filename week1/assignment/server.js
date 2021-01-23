const express = require("express")
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect('mongodb://localhost:27017/inventorybd',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

},
() => console.log("Connected to the DB"))

app.use("/inventory", require("./server/routes/inventoryRouter.js"))



app.listen(9000, () => {
    console.log("The server is running on port 9000")
})