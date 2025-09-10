const express = require('express');
const isAuthenticated = require('../auth');
const routes = express.Router();

routes.get('/', (req, res) => {
   res.send(' hola soy home sin authentication');
});

routes.get('/home', isAuthenticated,(req, res) => {
   res.send(' hola soy home route con authentication');
});

module.exports = routes;