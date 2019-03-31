const mongoose = require('mongoose')
const User = require('../data/User')

require('../data/BankAccount')
require('../data/Credit')

mongoose.Promise = global.Promise

module.exports = (settings) => {
  mongoose.connect(settings.db, { 'useNewUrlParser': true })
  let db = mongoose.connection

  db.once('open', err => {
    if (err) {
      throw err
    }

    console.log('MongoDB ready!')

    User.seedAdminUser()
  })

  db.on('error', err => console.log(`Database error: ${err}`))
}
