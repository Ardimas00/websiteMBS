import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from '../components/Modal';

export default function AdminProducts() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const CATEGORY_LIST = [
  "PUPUK NPK",
  "PUPUK TUNGGAL",
  "PEMBENAH TANAH",
  "PUPUK MIKRO",
  "BIOLOGIS",
  "LAINNYA"
];

const [form, setForm] = useState({ name: '', description: '', imageUrl: '', category: 'LAINNYA' });
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
      let imageUrl = form.imageUrl;
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const res = await axios.post('http://localhost:5000/upload', formData);
        imageUrl = res.data.url;
      }
      const payload = { ...form, imageUrl, category: form.category };
      if (editId) {
        await axios.put(`http://localhost:5000/products/${editId}`, payload);
      } else {
        await axios.post('http://localhost:5000/products', payload);
      }
      setForm({ name: '', description: '', imageUrl: '', category: 'LAINNYA' });
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
    setForm({ name: product.name, description: product.description, imageUrl: product.imageUrl, category: product.category || 'LAINNYA' });
    setEditId(product._id);
    setError('');
    setShowModal(true);
  };


  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-100 p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <Link to="/admin" className="inline-block mb-6 text-green-700 hover:underline">&larr; Kembali ke Dashboard</Link>
        <h2 className="text-3xl font-extrabold mb-8 text-gray-800 tracking-tight">Manajemen Produk</h2>
        {/* Tombol tambah produk */}
        <div className="flex justify-end mb-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 font-semibold flex items-center gap-2"
            onClick={() => {
              setForm({ name: '', description: '', imageUrl: '', category: 'LAINNYA' });
              setEditId(null);
              setFile(null);
              setError('');
              setShowModal(true);
            }}
          >
            + Tambah Produk
          </button>
        </div>
        {/* Modal form produk */}
        <Modal open={showModal} onClose={() => setShowModal(false)} title={editId ? 'Edit Produk' : 'Tambah Produk'}>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Nama Produk"
            />
            <select
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
            >
              {CATEGORY_LIST.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <textarea
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 md:col-span-2"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Deskripsi"
              rows={3}
            />
            <input
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 md:col-span-2"
              value={form.imageUrl}
              onChange={e => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="URL Gambar (opsional)"
            />
            <input
              type="file"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 md:col-span-2"
              onChange={e => setFile(e.target.files[0])}
            />
          </div>
          <div className="mt-4 flex items-center gap-4">
            <button
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
              onClick={async () => {
                await save();
                setShowModal(false);
              }}
              disabled={!form.name.trim() || !form.description.trim()}
            >
              {editId ? 'Update Produk' : 'Tambah Produk'}
            </button>
            <button
              className="text-gray-600 hover:underline"
              onClick={() => {
                setShowModal(false);
                setForm({ name: '', description: '', imageUrl: '', category: 'LAINNYA' });
                setEditId(null);
                setError('');
                setFile(null);
              }}
            >
              Batal
            </button>
          </div>
        </Modal>
        <div className="bg-white/80 rounded-2xl shadow-xl p-8 border border-green-100">
          <h3 className="text-xl font-bold mb-4">Daftar Produk</h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700 font-bold">
                  <th className="border-b border-gray-200 px-4 py-2">Nama</th>
                  <th className="border-b border-gray-200 px-4 py-2">Kategori</th>
                  <th className="border-b border-gray-200 px-4 py-2">Deskripsi</th>
                  <th className="border-b border-gray-200 px-4 py-2">Gambar</th>
                  <th className="border-b border-gray-200 px-4 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, idx) => (
                  <tr key={p._id} className={`transition-all duration-150 ${idx%2===0 ? 'bg-white' : 'bg-gray-50'} hover:shadow-lg hover:scale-[1.01]`}>
                    <td className="border-b border-gray-200 px-4 py-2 font-semibold">{p.name}</td>
                    <td className="border-b border-gray-200 px-4 py-2">{p.category || 'LAINNYA'}</td>
                    <td className="border-b border-gray-200 px-4 py-2">{p.description}</td>
                    <td className="border-b border-gray-200 px-4 py-2 text-center">
                      {p.imageUrl ? (
                        <img
                          src={p.imageUrl?.startsWith('http') ? p.imageUrl : `http://localhost:5000${p.imageUrl}`}
                          alt={p.name}
                          className="h-14 w-14 object-contain mx-auto rounded-lg border border-gray-200 shadow transition-all duration-150 hover:scale-105"
                        />
                      ) : '—'}
                    </td>
                    <td className="border-b border-gray-200 px-4 py-2">
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(p)} className="px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded text-xs">Edit</button>
                        <button onClick={() => remove(p._id)} className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs">Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
