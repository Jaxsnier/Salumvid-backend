const mongoose = require('mongoose');
const Ventana = require('./Ventana');


const Proyectos = mongoose.model('Proyectos',new mongoose.Schema({
  propietario: String,
  proyecto_nombre: String,
  arreglo_ventanas: [Ventana],
  
}));

module.exports = Proyectos;