const mongoose = require('mongoose')

let creditSchema = new mongoose.Schema({
    pin: { type: String, required: true },
    amount: { type: Number, required: true },
    createdOn: { type: Date},
    approvedOn: { type: Date},
    approved: { type: Boolean, default: false }
})

let Credit = mongoose.model('Credit', creditSchema)

module.exports = Credit
