import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
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
    load();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manajemen Produk</h2>

      <div className="space-y-2 mb-6">
        {error && <p className="text-red-500">{error}</p>}
        <input
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Nama Produk"
        />
        <input
          className="w-full border p-2 rounded"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          placeholder="Deskripsi"
        />
        <input
          className="w-full border p-2 rounded"
          value={form.imageUrl}
          onChange={e => setForm({ ...form, imageUrl: e.target.value })}
          placeholder="URL Gambar (opsional)"
        />
        <input
          type="file"
          className="w-full border p-2 rounded"
          onChange={e => setFile(e.target.files[0])}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          onClick={save}
          disabled={!form.name.trim() || !form.description.trim()}
        >
          {editId ? 'Update Produk' : 'Tambah Produk'}
        </button>
        {editId && (
          <button
            className="ml-4 text-gray-600 hover:underline"
            onClick={() => {
              setForm({ name: '', description: '', imageUrl: '' });
              setEditId(null);
              setError('');
              setFile(null);
            }}
          >
            Batal Edit
          </button>
        )}
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Nama</th>
            <th className="border px-4 py-2">Deskripsi</th>
            <th className="border px-4 py-2">Gambar</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{p.name}</td>
              <td className="border px-4 py-2">{p.description}</td>
              <td className="border px-4 py-2">
                {p.imageUrl ? (
                  <img
                    src={
                      p.imageUrl?.startsWith('http')
                        ? p.imageUrl
                        : `http://localhost:5000${p.imageUrl}`
                    }
                    alt={p.name}
                    className="h-16 object-contain mx-auto" />
                ) : '—'}
              </td>
              <td className="border px-4 py-2 space-x-2">
                <button className="text-blue-500 hover:underline" onClick={() => startEdit(p)}>Edit</button>
                <button className="text-red-500 hover:underline" onClick={() => remove(p._id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
