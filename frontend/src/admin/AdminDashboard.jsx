import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaNewspaper } from 'react-icons/fa';

import LogoutIcon from "./LogoutIcon";

export default function AdminDashboard() {
  // Info ringkas dashboard
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);

  // Untuk manajemen produk
  const [form, setForm] = useState({ name: '', description: '', imageUrl: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);

  const load = async () => {
    try {
      const res = await axios.get('http://localhost:5000/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error loading products:', err);
    }
  };

  const uploadImage = async () => {
    if (!file) return null;
    const formData = new FormData();
    formData.append('image', file);
    const res = await axios.post('http://localhost:5000/upload', formData);
    return res.data.url;
  };

  const save = async () => {
    if (!form.name.trim() || !form.description.trim()) {
      setError('Nama dan deskripsi wajib diisi');
      return;
    }
    setError('');

    try {
      // ⬇️ Upload file lokal jika ada
      let imageUrl = form.imageUrl;
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const res = await axios.post('http://localhost:5000/upload', formData);
        imageUrl = res.data.url;
      }

      const payload = { ...form, imageUrl };

      if (editId) {
        // PUT untuk update produk
        await axios.put(`http://localhost:5000/products/${editId}`, payload);
      } else {
        // POST untuk tambah produk baru
        await axios.post('http://localhost:5000/products', payload);
      }

      setForm({ name: '', description: '', imageUrl: '' });
      setFile(null);
      setEditId(null);
      load();
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  const remove = async id => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      load();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const startEdit = product => {
    setForm({ name: product.name, description: product.description, imageUrl: product.imageUrl });
    setEditId(product._id);
    setError('');
  };

  useEffect(() => {
    // Info ringkas
    axios.get('http://localhost:5000/products').then(res => setProducts(res.data));
    axios.get('http://localhost:5000/articles').then(res => setArticles(res.data));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-100 p-8">
      <LogoutIcon />
      <a href="/" className="inline-flex items-center mb-6 px-4 py-2 bg-white/80 hover:bg-white text-gray-700 shadow rounded-full border border-gray-200 transition group">
        <svg className="w-5 h-5 mr-2 text-blue-500 group-hover:-translate-x-1 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Kembali ke Homepage
      </a>
      <h1 className="text-3xl font-extrabold mb-10 text-gray-800 tracking-tight">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Link to="/admin/products" className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition group border border-gray-100">
          <FaBoxOpen className="text-4xl text-green-600 mb-4 group-hover:scale-110 group-hover:text-green-700 transition" />
          <div className="text-xl font-semibold mb-2">Manajemen Produk</div>
          <div className="text-gray-600 mb-4 text-center">Kelola produk, tambah baru, edit, dan hapus produk.</div>
          <div className="text-2xl font-bold text-green-700">{products.length} Produk</div>
        </Link>
        <Link to="/admin/articles" className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition group border border-gray-100">
          <FaNewspaper className="text-4xl text-blue-600 mb-4 group-hover:scale-110 group-hover:text-blue-700 transition" />
          <div className="text-xl font-semibold mb-2">Manajemen Artikel</div>
          <div className="text-gray-600 mb-4 text-center">Kelola artikel, tambah baru, edit, dan hapus artikel.</div>
          <div className="text-2xl font-bold text-blue-700">{articles.length} Artikel</div>
        </Link>
      </div>
    </div>
  );
}
