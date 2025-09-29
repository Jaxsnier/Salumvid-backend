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
   
   try {
      const resultado = await Tablas.AgregarVentana(req);
      if (!resultado) return res.status(400).send('Error al actualizar tabla l1 en home');
      
      res.send(resultado);
   } catch (err) {console.error(err);return res.status(500).send('Error al actualizar tabla l2 en home');}

});

routes.get('/home/proyecto', isAuthenticated, async (req, res) => {  //pedir listado de proyectos
   try {
      const listaProyectos = await Tablas.BuscarProyectos(req.user._id)
      return res.send (listaProyectos);

   } catch (err) {console.error(err);return res.status(500).send('Error al obtener tablas');}
});


export default routes;