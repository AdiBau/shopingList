const mongoose = require('mongoose')

const userKontoList = new mongoose.Schema({

  userID: {
    type: String,
    required: true
  },
  userKontoListName: {
    type: String,
    required: [true, "Nazwa Listy"]
  },
  Created: {
    type: Date,
    value: Date.now(),
  },
})

module.exports = mongoose.model('userKontoList', userKontoList)