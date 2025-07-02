const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');
const multer = require('multer');

const Admin = require('./models/Admin');
const Product = require('./models/Product');
const Article = require('./models/Article');

const app = express();
app.use(cors());
app.use(express.json());

// 💾 Serve folder upload secara publik
app.use('/uploads', express.static('public/uploads'));


// 🧠 Koneksi MongoDB
mongoose.connect('mongodb://localhost:27017/websitembs')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// 🔐 LOGIN ADMIN
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin && await bcrypt.compare(password, admin.password)) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// 📦 CRUD PRODUK
app.get('/products', async (_, res) => res.json(await Product.find()));
app.post('/products', async (req, res) => {
  console.log('[POST /products] req.body:', req.body);
  const newProduct = await new Product(req.body).save();
  res.json(newProduct);
});
app.put('/products/:id', async (req, res) => {
  console.log('[PUT /products/:id] req.body:', req.body);
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});
app.delete('/products/:id', async (req, res) => res.json(await Product.findByIdAndDelete(req.params.id)));

// 📰 CRUD ARTIKEL
app.get('/articles', async (_, res) => res.json(await Article.find().sort({ createdAt: -1 })));
app.post('/articles', async (req, res) => res.json(await new Article(req.body).save()));
app.put('/articles/:id', async (req, res) => res.json(await Article.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete('/articles/:id', async (req, res) => res.json(await Article.findByIdAndDelete(req.params.id)));

// 📤 UPLOAD GAMBAR - Menggunakan route terpisah
const uploadRoute = require('./routes/upload');
app.use('/upload', uploadRoute);

// 📩 ROUTE KONTAK
const contactRoute = require('./routes/contact');
app.use('/contact', contactRoute);

// 🚀 Jalankan server
app.listen(5000, () => {
  console.log('✅ Backend running on http://localhost:5000');
});
