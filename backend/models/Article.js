// models/Article.js
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  title: String,
  slug: String,
  desc: String,
  category: String,
  date: String,
  content: String,
  img: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Article', schema);
