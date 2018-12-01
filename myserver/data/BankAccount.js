const mongoose = require('mongoose')

let bankAccountSchema = new mongoose.Schema({
    ownerFirstName: { type: String, required: true },
    ownerLastName: { type: String, required: true },
    ownerPin: { type: String, required: true },
    balance: { type: Number, required: true },
    history: { type: [Object] },
    createdOn: { type: Date},
    lastChange: { type: Date, default: Date.now() }
})

let BankAccount = mongoose.model('BankAccount', bankAccountSchema)

module.exports = BankAccount
