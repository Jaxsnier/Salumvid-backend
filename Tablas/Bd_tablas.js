import Proyectos from "../models/Proyectos.js";

//buscar tabla en base de datos de proyecto
export async function BuscarTabla(userId, proyecto_nombre) {  //pedir tablas de datos

   const proyecto = await Proyectos.findOne({ propietario: userId, proyecto_nombre: proyecto_nombre }).populate("arreglo_ventanas")

   return proyecto
};

export async function CrearTabla(userId, proyecto_nombre) {
   const proyecto = await BuscarTabla(userId, proyecto_nombre, proyecto_nombre) //buscamos proyecto para saber si ya existe

   if (proyecto) return "Nombre invalido: repetido" // verificamos si esta repetido

   // guardamos
   const nuevoProyecto = new Proyectos({
      propietario: userId,
      proyecto_nombre: proyecto_nombre,
      arreglo_ventanas: [],
   })

   const resultado = await nuevoProyecto.save().then((res_proyecto) => {
      console.log(res_proyecto)   //aqui se envia el proyecto      error seguimiento
      return res_proyecto;
   }).catch((err) => {
      console.log(err)
      return ("Error al salvar en bd CrearTabla");
   })

   return resultado
}

export async function ActualizarTabla(userId, req) {
   
   const proyecto = await BuscarTabla(req.user._id, req.body.proyecto_nombre)
   if (!proyecto) return (`proyecto ${req.body.proyecto_nombre} no existe`)

   const nueva_ventana = new Ventana({
      Id: req.body.Id,
      Hueco_Cant: req.body.Hueco_Cant,
      Hueco_Ancho: req.body.Hueco_Ancho,
      Hueco_Alto: req.body.Hueco_Alto,
      Hueco_Hojas: req.body.Hueco_Hojas,
      //<!-- Perfiles Marco -->
      Perfiles_Marco_Cant: req.body.Perfiles_Marco_Cant,
      Perfiles_Marco_Medida: req.body.Perfiles_Marco_Medida,
      Perfiles_Marco_Cant: req.body.Perfiles_Marco_Cant,
      Perfiles_Marco_Medida: req.body.Perfiles_Marco_Medida,
      //<!-- Perfiles Hoja -->
      Perfiles_Hoja_Cant: req.body.Perfiles_Hoja_Cant,
      Perfiles_Hoja_Medida: req.body.Perfiles_Hoja_Medida,
      Perfiles_Hoja_Cant: req.body.Perfiles_Hoja_Cant,
      Perfiles_Hoja_Medida: req.body.Perfiles_Hoja_Medida,
      //<!-- Vidrio -->
      Viderio_Cant: req.body.Viderio_Cant,
      Viderio_Ancho: req.body.Viderio_Ancho,
      Viderio_Alto: req.body.Viderio_Alto,
      //<!-- Goma -->
      Goma_Pie: req.body.Goma_Pie,
   })

   await nueva_ventana.save()
   proyecto.arreglo_ventanas = proyecto.arreglo_ventanas.push(nueva_ventana._id)

   await Proyectos.findByIdAndUpdate(proyecto._id, {
      arreglo_ventanas: proyecto.arreglo_ventanas
   }).then(() => { 
      return (nueva_ventana) 
   })
   .catch((err) => {console.log(err); return ("error al untentar actualizar bd");})
   
}

export const prueba = () => {
   return "hola"
}

