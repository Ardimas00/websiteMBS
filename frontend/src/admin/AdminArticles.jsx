import { useState, useEffect } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { Link } from "react-router-dom";
import Modal from '../components/Modal';

export default function AdminArticles() {
  useEffect(() => { load(); }, []);
  const [showModal, setShowModal] = useState(false);
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    desc: "",
    category: "",
    date: "",
    content: "",
    img: "",
  });
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);

  const handleEdit = (article) => {
    setForm({
      title: article.title || "",
      slug: article.slug || "",
      desc: article.desc || "",
      category: article.category || "",
      date: article.date || "",
      content: article.content || "",
      img: article.img || "",
    });
    setEditId(article._id);
    setFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if(window.confirm('Yakin ingin menghapus artikel ini?')) {
      await axios.delete(`http://localhost:5000/articles/${id}`);
      load();
    }
  };


  const load = async () => {
    const res = await axios.get("http://localhost:5000/articles");
    setArticles(res.data);
  };

  const uploadImage = async () => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post("http://localhost:5000/upload", formData);
    return res.data.url;
  };

  const save = async () => {
    let imageUrl = form.img;
    if (file) {
      const uploaded = await uploadImage();
      if (uploaded) imageUrl = uploaded;
    }
    let payload = { ...form, img: imageUrl };
    if (!editId && !form.date) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      payload.date = `${yyyy}-${mm}-${dd}`;
    }
    if (editId) {
      await axios.put(`http://localhost:5000/articles/${editId}`, payload);
    } else {
      await axios.post("http://localhost:5000/articles", payload);
    }
    setForm({ title: "", slug: "", desc: "", category: "", date: "", content: "", img: "" });
    setFile(null);
    setEditId(null);
    load();
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-100 p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <Link to="/admin" className="inline-block mb-6 text-blue-700 hover:underline">
          &larr; Kembali ke Dashboard
        </Link>
        <h2 className="text-3xl font-extrabold mb-8 text-gray-800 tracking-tight">
          Manajemen Artikel
        </h2>
        {/* Tombol tambah artikel */}
        <div className="flex justify-end mb-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 font-semibold flex items-center gap-2"
            onClick={() => {
              setForm({ title: '', slug: '', desc: '', category: '', date: '', content: '', img: '' });
              setEditId(null);
              setFile(null);
              setShowModal(true);
            }}
          >
            + Tambah Artikel
          </button>
        </div>
        {/* Modal form artikel */}
        <Modal open={showModal} onClose={() => setShowModal(false)} title={editId ? 'Edit Artikel' : 'Tambah Artikel'}>
          <div className="w-full max-w-3xl mx-auto p-2">
            <form onSubmit={e => {e.preventDefault(); save(); setShowModal(false);}}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="border p-2 rounded"
                  placeholder="Judul"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <input
                  className="border p-2 rounded"
                  placeholder="Slug"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                />
                <textarea
                  className="border p-2 rounded md:col-span-2"
                  placeholder="Deskripsi"
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  rows={2}
                />
                <input
                  className="border p-2 rounded"
                  placeholder="Kategori"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
                <input
                  type="file"
                  className="border p-2 rounded"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <input
                  className="border p-2 rounded md:col-span-2"
                  placeholder="URL Gambar (opsional)"
                  value={form.img}
                  onChange={(e) => setForm({ ...form, img: e.target.value })}
                />
                <div className="md:col-span-2">
                  <Editor
                    apiKey="489fzag6qiqhzdtvwte21vh1l2fevkcnj3r2bbraq2my9lp0"
                    value={form.content}
                    onEditorChange={(content) => setForm({ ...form, content })}
                    init={{
                      height: 220,
                      menubar: false,
                      plugins: "link image code",
                      toolbar: "undo redo | bold italic | code",
                    }}
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
                  disabled={!form.title.trim() || !form.slug.trim()}
                >
                  {editId ? 'Update Artikel' : 'Tambah Artikel'}
                </button>
                <button
                  type="button"
                  className="text-gray-600 hover:underline"
                  onClick={() => {
                    setShowModal(false);
                    setForm({ title: '', slug: '', desc: '', category: '', date: '', content: '', img: '' });
                    setEditId(null);
                    setFile(null);
                  }}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </Modal>
        <div className="bg-white/80 rounded-2xl shadow-xl p-8 border border-blue-100">
          <h3 className="text-xl font-bold mb-4">Daftar Artikel</h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700 font-bold">
                  <th className="border-b border-gray-200 px-4 py-2">Judul</th>
                  <th className="border-b border-gray-200 px-4 py-2">Gambar</th>
                  <th className="border-b border-gray-200 px-4 py-2">Kategori</th>
                  <th className="border-b border-gray-200 px-4 py-2">Tanggal</th>
                  <th className="border-b border-gray-200 px-4 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((a, idx) => (
                  <tr
                    key={a._id}
                    className={`transition-all duration-150 ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:shadow-lg hover:scale-[1.01]`}
                  >
                    <td className="border-b border-gray-200 px-4 py-2 font-semibold">
                      {a.title}
                    </td>
                    <td className="border-b border-gray-200 px-4 py-2 text-center">
                      {a.img ? (
                        <img
                          src={a.img?.startsWith('http') ? a.img : `http://localhost:5000${a.img}`}
                          alt={a.title}
                          className="h-16 w-16 object-contain mx-auto rounded-lg border border-gray-200 shadow transition-all duration-150 hover:scale-105"
                        />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="border-b border-gray-200 px-4 py-2">
                      {a.category || "-"}
                    </td>
                    <td className="border-b border-gray-200 px-4 py-2">
                      {a.date || "-"}
                    </td>
                    <td className="border-b border-gray-200 px-4 py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(a)}
                          className="px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(a._id)}
                          className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
                        >
                          Hapus
                        </button>
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
