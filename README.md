# Website MBS - PT Barokah Jir

Website perusahaan pupuk PT Barokah Jir dengan fitur katalog produk, artikel, dan admin panel.

## 🚀 Cara Menjalankan Aplikasi

### Setup Awal (Pertama Kali)

1. **Buat folder upload:**
   ```bash
   # Menggunakan PowerShell
   .\create-uploads-folder.ps1
   
   # Atau manual
   mkdir backend\public\uploads
   ```

2. **Install dependencies:**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Jalankan aplikasi:**
   ```bash
   # Menggunakan script
   .\start.ps1
   
   # Atau manual
   cd backend && npm start
   # Di terminal baru
   cd frontend && npm start
   ```

## 📁 Struktur Aplikasi

```
websiteMBS/
├── backend/                 # Server Node.js + Express
│   ├── models/             # Model MongoDB
│   ├── routes/             # Route handlers
│   ├── public/uploads/     # Folder upload gambar
│   └── index.js           # Server utama
├── frontend/               # React App
│   ├── src/
│   │   ├── admin/         # Halaman admin
│   │   ├── components/    # Komponen React
│   │   └── ...
│   └── public/
├── create-uploads-folder.ps1  # Script buat folder upload
├── start.ps1              # Script untuk menjalankan keduanya
└── test-upload.html       # Test upload gambar
```

## 🔧 Fitur Utama

### Frontend
- ✅ Halaman Utama dengan Hero, About, Product Catalog
- ✅ Katalog Produk dengan gambar
- ✅ Artikel & Panduan (dari database)
- ✅ Halaman Detail Produk
- ✅ Halaman Detail Artikel
- ✅ Admin Panel untuk manajemen produk dan artikel
- ✅ Upload gambar untuk produk dan artikel

### Backend
- ✅ API REST untuk produk dan artikel
- ✅ Upload gambar dengan Multer
- ✅ Database MongoDB
- ✅ Authentication admin
- ✅ CRUD operations

## 🖼️ Upload Gambar

### Cara Upload Gambar di Admin Panel:

1. **Buka Admin Panel:**
   - Login di: http://localhost:3000/login
   - Atau langsung ke: http://localhost:3000/admin

2. **Upload Gambar Produk:**
   - Pilih file gambar di field "File"
   - Atau masukkan URL gambar di field "URL Gambar"
   - Klik "Tambah Produk" atau "Update Produk"

3. **Upload Gambar Artikel:**
   - Buka: http://localhost:3000/admin/articles
   - Pilih file gambar atau masukkan URL
   - Klik "Tambah Artikel" atau "Update Artikel"

### Test Upload Gambar:

Buka file `test-upload.html` di browser untuk test upload gambar secara langsung.

## 🐛 Troubleshooting Upload Gambar

**Jika gambar tidak tampil:**

1. **Pastikan folder upload ada:**
   ```bash
   .\create-uploads-folder.ps1
   ```

2. **Pastikan backend berjalan:**
   ```bash
   # Cek apakah backend berjalan di port 5000
   curl http://localhost:5000/products
   ```

3. **Periksa console browser:**
   - Buka Developer Tools (F12)
   - Lihat tab Console untuk error
   - Lihat tab Network untuk request yang gagal

4. **Test upload manual:**
   - Buka `test-upload.html` di browser
   - Upload gambar dan lihat hasilnya

## 🗄️ Database

**MongoDB Connection:**
- URL: `mongodb://localhost:27017/websitembs`
- Pastikan MongoDB berjalan di local machine

**Collections:**
- `products` - Data produk
- `articles` - Data artikel
- `admins` - Data admin

## 🔐 Admin Access

**Default Admin (jika belum ada):**
- Username: `admin`
- Password: `admin123`

**Untuk membuat admin baru:**
```bash
cd backend
node database/seedAdmin.js
```

## 🛠️ Development

**Backend Dependencies:**
- Express.js
- MongoDB + Mongoose
- Multer (upload file)
- CORS
- bcrypt (password hashing)

**Frontend Dependencies:**
- React
- React Router
- Axios
- Tailwind CSS
- AOS (animations)
- TinyMCE (rich text editor)

## 📝 Notes

- Pastikan MongoDB berjalan sebelum menjalankan backend
- Folder `backend/public/uploads/` harus ada untuk upload gambar
- Jika ada masalah CORS, pastikan backend mengizinkan origin frontend
- Untuk production, ganti URL `localhost` dengan domain yang sesuai

## 🐛 Troubleshooting Umum

**Error "Cannot connect to MongoDB":**
- Pastikan MongoDB service berjalan
- Cek connection string di `backend/index.js`

**Error "Upload failed":**
- Pastikan folder `backend/public/uploads/` ada dan writable
- Cek permission folder

**Gambar tidak tampil:**
- Periksa URL gambar di database
- Pastikan file ada di folder uploads
- Cek network tab di browser developer tools

**AdminArticles tidak berfungsi:**
- Pastikan backend berjalan di port 5000
- Cek console browser untuk error
- Pastikan folder upload ada

## 🚀 Quick Start

1. **Clone repository**
2. **Buat folder upload:** `.\create-uploads-folder.ps1`
3. **Install dependencies:** `cd backend && npm install && cd ../frontend && npm install`
4. **Jalankan aplikasi:** `.\start.ps1`
5. **Buka browser:** http://localhost:3000
6. **Admin panel:** http://localhost:3000/admin

## ✅ Perbaikan AdminArticles

**Fitur yang diperbaiki:**
- ✅ Error handling yang lebih baik
- ✅ Loading states
- ✅ Validasi form yang lebih lengkap
- ✅ Feedback visual untuk upload
- ✅ Konfirmasi sebelum hapus
- ✅ Tampilan yang lebih rapi
- ✅ Preview gambar yang diupload
