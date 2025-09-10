const mongoose = require('mongoose');


const Users = mongoose.model('Users',new mongoose.Schema({
  username: String,
  password: String,
  salt: String,
}));

module.exports = Users;