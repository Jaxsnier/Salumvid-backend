import mongoose from 'mongoose'


const Users = mongoose.model('Users',new mongoose.Schema({
  username: String,
  password: String,
  salt: String,
}));

export default Users;