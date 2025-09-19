const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const Proyectos = mongoose.model('Proyectos',new mongoose.Schema({
  propietario: String,
  proyecto_nombre: String,
  arreglo_ventanas: [{
     type:Schema.Types.ObjectId,
     ref:'Ventana'
  }],
  
}));

module.exports = Proyectos;