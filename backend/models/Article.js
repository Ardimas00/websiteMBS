// models/Article.js
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Article', schema);
