const express = require('express');
const isAuthenticated = require('../auth');
const routes = express.Router();
const Proyectos = require('../models/Proyectos');

routes.get('/', (req, res) => {
   res.send(' hola soy home sin authentication');
});

routes.get('/home', isAuthenticated, (req, res) => {
   res.send(' hola soy home route con authentication');
});


routes.get('/home/tablas', isAuthenticated, (req, res) => {  //pedir tablas de datos

   Proyectos.findOne({ proyecto_nombre }).exec().then(proyecto => {
      if (!proyecto) return res.status(401).send('Proyecto incorrecto l-1'); // verificamos si encontro un proyecto con ese nombre

      res.send(proyecto);

   });

});

routes.post('/home/tablas', isAuthenticated, (req, res) => { //registrar tablas de datos

   //buscamos tabla del frontend
   //validamos que si existe, en dado caso la modificamos y si no existe la creamos

   res.send('tabla creado correctamente');

});

module.exports = routes;