import Proyectos from "../models/Proyectos.js";

//buscar tabla en base de datos de proyecto
export async function BuscarTabla(userId, proyecto_nombre) {  //pedir tablas de datos

   const proyecto = await Proyectos.findOne({ propietario: userId, proyecto_nombre: proyecto_nombre }).populate("arreglo_ventanas")

   return proyecto
};

export async function CrearTabla(userId, proyecto_nombre) 
{
    const proyecto = BuscarTabla(userId, proyecto_nombre, proyecto_nombre) //buscamos proyecto
 
   if (proyecto) return res.send("Nombre invalido: repetido") // verificamos si esta repetido

   // guardamos
   const nuevoProyecto = new Proyectos({
      propietario: userId,
      proyecto_nombre: proyecto_nombre,
      arreglo_ventanas: [],
   })

   await nuevoProyecto.save().then((res_proyecto) => {
     return res_proyecto;
   }).catch((err) => {
      console.log(err)
      return res.send("Error al salvar en bd CrearTabla");
   })

}

export async function ActualizarTabla(params) 
{
   return null
}

export const prueba = () => {
   return "hola"
}

