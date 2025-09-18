const mongoose = require('mongoose');
const Ventana = require('./Ventana');


const Proyecto = mongoose.model('Proyecto',new mongoose.Schema({
  name: String,
  ventanas : [Ventana],
  
}));

module.exports = Proyecto;