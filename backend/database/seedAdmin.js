const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');


mongoose.connect('mongodb://localhost:27017/websitembs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  const username = 'admin2';
  const password = 'admin';
  const passwordHash = await bcrypt.hash(password, 10);

  const existing = await Admin.findOne({ username });
  if (existing) {
    console.log('⚠️ Admin already exists');
    process.exit();
  }

  const admin = new Admin({ username, password: passwordHash });
  await admin.save();
  console.log('✅ Admin user created:');
  console.log({ username, password });
  process.exit();
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
