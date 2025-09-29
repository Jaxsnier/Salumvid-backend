import express from 'express'
import isAuthenticated from '../auth/index.js'
import Proyectos from '../models/Proyectos.js'
import Ventana from '../models/Ventana.js'
import * as Tablas from "../tablas/Bd_tablas.js"

const routes = express.Router();

routes.get('/', (req, res) => {
   res.send(' hola soy home sin authentication');
});

routes.get('/home', isAuthenticated, (req, res) => {
   res.send(' hola soy home route con authentication');
});


routes.get('/home/tablas', isAuthenticated, async (req, res) => {  //pedir tablas de datos
   try {
      // use query for GET requests; fall back to body if provided
      const proyecto_nombre = req.body.proyecto_nombre;
      const tabla = await Tablas.BuscarTabla(req.user._id, proyecto_nombre);
      
      if (!tabla) return res.status(404).send('Tabla no encontrada');
      
      return res.send(tabla);

   } catch (err) {console.error(err);return res.status(500).send('Error al obtener tablas');}
});

routes.post('/home/tablas', isAuthenticated, async (req, res) => { //registrar proyecto
   try {
      const proyecto_nombre = req.body.proyecto_nombre;
      const nuevoProyecto = await Tablas.CrearTabla(req.user._id, proyecto_nombre);

      console.log(nuevoProyecto) //aqui es undefined  error de seguimiento

      if (!nuevoProyecto) return res.status(400).send('Error al crear tabla');
      res.send(nuevoProyecto);

   } catch (err) {console.error(err);return res.status(500).send('Error al crear tabla');}
   
});

routes.patch('/home/tablas', isAuthenticated, async (req, res) => { //modificar o crear una ventana
   
   const proyecto = await Proyectos.findOne({propietario: req.user._id, proyecto_nombre: req.body.proyecto_nombre})
   if(!proyecto) return res.send(`proyecto ${req.body.proyecto_nombre} no existe`);

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
   
   await Proyectos.findByIdAndUpdate(proyecto._id,{
      arreglo_ventanas: proyecto.arreglo_ventanas
   }).then(() => { return res.send(nueva_ventana)}).catch((err) => {
      console.log(err)
      return res.send("error L-1");
   })

});


export default routes;