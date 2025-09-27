import mongoose from 'mongoose'


const Ventana = mongoose.model('Ventana', new mongoose.Schema({
    //<!-- Medidas Hueco -->
    Id: String,
    Hueco_Cant: String,
    Hueco_Ancho: String,
    Hueco_Alto: String,
    Hueco_Hojas: String,
    //<!-- Perfiles Marco -->
    Perfiles_Marco_Cant: String,
    Perfiles_Marco_Medida: String,
    Perfiles_Marco_Cant: String,
    Perfiles_Marco_Medida: String,
    //<!-- Perfiles Hoja -->
    Perfiles_Hoja_Cant: String,
    Perfiles_Hoja_Medida: String,
    Perfiles_Hoja_Cant: String,
    Perfiles_Hoja_Medida: String,
    //<!-- Vidrio -->
    Viderio_Cant: String,
    Viderio_Ancho: String,
    Viderio_Alto: String,
    //<!-- Goma -->
    Goma_Pie: String,
}));

export default Ventana;