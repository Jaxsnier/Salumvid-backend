import Proyectos from "../models/Proyectos.js";

//buscar tabla en base de datos de proyecto
export async function BuscarTabla(userId, proyecto_nombre) {  //pedir tablas de datos

   const proyecto = await Proyectos.findOne({ propietario: userId, proyecto_nombre: proyecto_nombre }).populate("arreglo_ventanas")

   return proyecto
};

export async function CrearTabla(params) 
{
   return null
}

export async function ActualizarTabla(params) 
{
   return null
}

export const prueba = () => {
   return "hola"
}

