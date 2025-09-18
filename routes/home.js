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
   
   const { username, password } = req.body; //buscamos usuario y pass del frontend
   if (!username || !password) { return res.status(400).send('Faltan datos'); } //validamos que existan

   crypto.randomBytes(48, (err, salt) => {
      if (err) return res.status(500).send('Error Generando salt l-1');

      const newSalt = salt.toString('base64');
      crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
         if (err) return res.status(500).send('Error Generando salt l-2');

         const encryptedPassword = key.toString('base64');

         //verificamos si existe el usuario, sino registramos
         Users.findOne({ username }).exec().then(User => {
            if (User) return res.status(400).send('El usuario ya existe l-3');

            //no existe, lo registramos
            Users.create({
               username: username,
               password: encryptedPassword,
               salt: newSalt,
            }).then(() => {
               res.send('Usuario creado correctamente');
            })
         });
      });
   });
});

module.exports = routes;