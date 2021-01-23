const mongoose = require("mongoose")
const schema = mongoose.Schema

const inventorySchema = new Schema({
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    in_stock: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Inventory', inventorySchema)