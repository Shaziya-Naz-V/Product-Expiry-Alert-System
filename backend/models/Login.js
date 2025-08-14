const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  email: String,
  password: String
}, { collection: 'Login' }); 

module.exports = mongoose.model('Login', LoginSchema);
