const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  application: String,
  imageUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
