const mongoose = require('mongoose')

let bankAccountSchema = new mongoose.Schema({
    ownerId: { type: String, required: true },
    ownerName: { type: String, required: true },
    balance: { type: Number, required: true },
    balanceMovements: { type: [Number] },
    createdOn: { type: Date},
    lastChange: { type: Date, default: Date.now() }
})

let BankAccount = mongoose.model('BankAccount', bankAccountSchema)

module.exports = BankAccount
