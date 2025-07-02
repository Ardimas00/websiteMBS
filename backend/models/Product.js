const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  application: String,
  imageUrl: String,
  category: { type: String, default: "LAINNYA" } // field kategori produk
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
