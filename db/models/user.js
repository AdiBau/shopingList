const mongoose = require('mongoose')

const userList = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "Wprowadz nazwe"]
  },

  Pin: {
    type: Number,
    required: [true, " PIN hasło urzytkownika"]
  },
  Created: {
    type: Date,
    value: Date.now(),
  },
})

module.exports = mongoose.model('urzytkownik', userList)