const mongoose = require('mongoose')

const shopingList = new mongoose.Schema({
    Name: {
    type: String,
    required: [true, 'Wprowadz nazwe produktu'],
    trim: true,
    
  },
  Ilosc: {
    type: Number,
    trim: true,
    required: [false,'Podaj ilość'],
    default: 1,
    maxlength: [3, 'Maksymalnie 3 znaki'],
  },
  Kupione: {
    type: Boolean,
    default: false,
  },
  Data:{
    type: Date,
    value: Date.now(),
  },
  pin:{
    type:Number,
    required: true,
  },
  familyName:{
    type: String,
    required: true,
  }



      })

module.exports = mongoose.model('ListaZakupow', shopingList)
