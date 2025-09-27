import mongoose from 'mongoose'
import { Schema } from 'mongoose'


const Proyectos = mongoose.model('Proyectos',new mongoose.Schema({
  propietario: String,
  proyecto_nombre: String,
  arreglo_ventanas: [{
     type:Schema.Types.ObjectId,
     ref:'Ventana'
  }],
  
}));

export default Proyectos;