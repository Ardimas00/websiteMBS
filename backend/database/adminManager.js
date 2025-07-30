/**
 * 
 * 
 * dummy dari database dan seperti seader pada laravel
 * 
 * 
 * 
 * adminManager.js
 *
 * Script CLI untuk mengelola akun admin MongoDB secara aman dan praktis.
 *
 * FITUR:
 * - Tambah admin baru (password otomatis di-hash)
 * - Update password admin
 * - Hapus admin
 * - List seluruh admin (tanpa password)
 *
 * CONTOH PENGGUNAAN:
 *
 * 1. Tambah admin baru:
 *    node database/adminManager.js add <username> <password>
 *    Contoh: node database/adminManager.js add admin4 rahasia123
 *    Fungsi: Menambah admin baru. Username harus unik. Password akan di-hash otomatis.
 *
 * 2. Update admin:
 *    node database/adminManager.js update <username> [password]
 *    Contoh: node database/adminManager.js update admin4 passwordBaru
 *    Fungsi: Mengubah password admin (password baru di-hash). Username harus sudah ada.
 *
 * 3. Hapus admin:
 *    node database/adminManager.js delete <username>
 *    Contoh: node database/adminManager.js delete admin4
 *    Fungsi: Menghapus admin berdasarkan username.
 *
 * 4. List admin:
 *    node database/adminManager.js list
 *    Fungsi: Menampilkan seluruh username admin yang terdaftar.
 *
 * CATATAN:
 * - Password selalu di-hash sebelum disimpan.
 * - Jika hanya ingin update email, password bisa dikosongkan ("").
 * - Script ini hanya untuk backend/server, bukan untuk frontend!
 *
 * Author: Ardimas, AI Cascade
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

/**
 * Koneksi ke database MongoDB lokal (ubah URI jika perlu)
 */
async function connectDB() {
  await mongoose.connect('mongodb://emir:yohanis@mongodb.warungmicky.shop/nitipemir');
}

/**
 * Tambah admin baru
 * @param {Object} param0
 * @param {string} param0.username
 * @param {string} param0.password
 * @param {string} [param0.email]
 */
/**
 * Fungsi: Menambah admin baru ke database.
 * @param {Object} param0
 * @param {string} param0.username - Username admin (unik)
 * @param {string} param0.password - Password admin (akan di-hash)
 *
 * Contoh penggunaan CLI:
 *   node database/adminManager.js add admin4 passwordku
 */
async function addAdmin({ username, password }) {
  await connectDB();
  const exists = await Admin.findOne({ username });
  if (exists) throw new Error('Admin already exists');
  const hash = await bcrypt.hash(password, 10);
  const admin = new Admin({ username, password: hash });
  await admin.save();
  console.log('✅ Admin created:', { username });
  process.exit();
}

/**
 * Update data admin (password/email). Password di-hash jika diisi.
 * @param {Object} param0
 * @param {string} param0.username
 * @param {string} [param0.password]
 * @param {string} [param0.email]
 */
/**
 * Fungsi: Mengubah password admin berdasarkan username.
 * @param {Object} param0
 * @param {string} param0.username - Username admin
 * @param {string} [param0.password] - Password baru (akan di-hash)
 *
 * Contoh penggunaan CLI:
 *   node database/adminManager.js update admin4 passwordBaru
 */
async function updateAdmin({ username, password }) {
  await connectDB();
  const admin = await Admin.findOne({ username });
  if (!admin) throw new Error('Admin not found');
  if (password) admin.password = await bcrypt.hash(password, 10);
  await admin.save();
  console.log('✅ Admin updated:', { username });
  process.exit();
}

/**
 * Hapus admin berdasarkan username
 * @param {Object} param0
 * @param {string} param0.username
 */
async function deleteAdmin({ username }) {
  await connectDB();
  const res = await Admin.deleteOne({ username });
  if (res.deletedCount > 0) {
    console.log('✅ Admin deleted:', username);
  } else {
    console.log('⚠️ Admin not found:', username);
  }
  process.exit();
}

/**
 * Tampilkan daftar admin (tanpa password)
 */
/**
 * Fungsi: Menampilkan daftar username admin yang terdaftar.
 *
 * Contoh penggunaan CLI:
 *   node database/adminManager.js list
 */
async function listAdmins() {
  await connectDB();
  const admins = await Admin.find({}, '-password');
  console.table(admins.map(a => ({ username: a.username })));
  process.exit();
}

// CLI Usage
const [,, action, ...args] = process.argv;
(async () => {
  try {
    if (action === 'add') {
      const [username, password, email] = args;
      if (!username || !password) throw new Error('Usage: add <username> <password> [email]');
      await addAdmin({ username, password, email });
    } else if (action === 'update') {
      const [username, password, email] = args;
      if (!username) throw new Error('Usage: update <username> [password] [email]');
      await updateAdmin({ username, password, email });
    } else if (action === 'delete') {
      const [username] = args;
      if (!username) throw new Error('Usage: delete <username>');
      await deleteAdmin({ username });
    } else if (action === 'list') {
      await listAdmins();
    } else {
      console.log('Usage: node adminManager.js <add|update|delete|list> ...');
      console.log(' add <username> <password> [email]');
      console.log(' update <username> [password] [email]');
      console.log(' delete <username>');
      console.log(' list');
      process.exit();
    }
  } catch (err) {
    console.error('❌', err.message);
    process.exit(1);
  }
})();
