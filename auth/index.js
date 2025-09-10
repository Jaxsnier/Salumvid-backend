const jwt = require('jsonwebtoken');
const Users = require('../models/Users.js');

module.exports = (req, res, next) => {
   const token = req.headers.authorization;
   if (!token) return res.status(403).send('No autorizado, falta token l-1');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { 
        if (err) return res.status(401).send('No autorizado, token invalido l-2');

        const did = decoded._id;
        Users.findOne({_id: did}).exec()
        .then(user => {
            if (!user) return res.status(401).send('No autorizado, usuario no existe l-3' + did);

            req.user = user;
            next();
        })
    });
}