const express = require('express');
const crypto = require('crypto');
const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const isAuthenticated = require('../auth');


const routes = express.Router();

const signToken = (_id) => {
   return jwt.sign(
      {_id},
      process.env.JWT_SECRET,
      {expiresIn: 60*60*24*365 //1 año 
   }) 
}

routes.get('/', (req, res) => {
   res.send(' Accedio auth con metodo GET, Fovor utilice POST');
});

routes.post('/register', (req, res) => {
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

routes.post('/login', (req, res) => {
   const { username, password } = req.body;
   Users.findOne({ username }).exec().then(user => {
      if (!user) return res.status(401).send('Usuario incorrecto l-1');

      crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) => {
         if (err) return res.status(500).send('Error encryptando password l-2');
         
         const encryptedPassword = key.toString('base64'); //encriptamos
         if (user.password === encryptedPassword) { //contraseñas coinciden 
            const token = signToken(user._id);
            return res.send({ token });
         }
         res.status(401).send('Password incorrecto l-3');
      });
   });
});

routes.get('/me',isAuthenticated, (req, res) => {
   res.send({
      _id: req.user._id,
      username: req.user.username,
   });
});

module.exports = routes;