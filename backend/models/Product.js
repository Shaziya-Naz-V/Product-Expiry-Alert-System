const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  expiryDate: Date,
  quantity: Number,
  status: String,
});

module.exports = mongoose.model('Product', productSchema);