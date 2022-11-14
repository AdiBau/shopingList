const mongoose = require('mongoose')

const userList = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Wprowadz nazwe"]
  },

  userPIN: {
    type: Number,
    required: [true, " PIN hasło urzytkownika"]
  },

  Created: {
    type: Date,
    value: Date.now(),
  },





})

module.exports = mongoose.model('userList', userList)