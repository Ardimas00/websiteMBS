import { useState, useEffect } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

export default function AdminArtikel() {
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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/articles");
      setArticles(res.data);
    } catch (err) {
      setError("Gagal memuat artikel");
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async () => {
    if (!file) return null;
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post("http://localhost:5000/upload", formData);
      return res.data.url; // ✅ hasil: /uploads/gambar.jpg
    } catch (err) {
      setError("Gagal upload gambar");
      return null;
    }
  };

  const save = async () => {
    if (!form.title.trim() || !form.slug.trim() || !form.content.trim()) {
      setError("Judul, slug, dan konten wajib diisi");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      let imageUrl = form.img;

      if (file) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) imageUrl = uploadedUrl;
        else return;
      }

      const payload = { ...form, img: imageUrl };

      if (editId) {
        await axios.put(`http://localhost:5000/articles/${editId}`, payload);
        setSuccess("Artikel berhasil diperbarui");
      } else {
        await axios.post("http://localhost:5000/articles", payload);
        setSuccess("Artikel berhasil ditambahkan");
      }

      setForm({
        title: "",
        slug: "",
        desc: "",
        category: "",
        date: "",
        content: "",
        img: "",
      });
      setFile(null);
      setEditId(null);
      await load();
    } catch (err) {
      setError("Gagal menyimpan artikel");
    } finally {
      setLoading(false);
    }
  };

  const edit = (a) => {
    setForm({
      title: a.title || "",
      slug: a.slug || "",
      desc: a.desc || "",
      category: a.category || "",
      date: a.date || "",
      content: a.content || "",
      img: a.img || "",
    });
    setEditId(a._id);
    setFile(null);
    setError("");
    setSuccess("");
  };

  const remove = async (id) => {
    if (!window.confirm("Yakin ingin menghapus artikel ini?")) return;
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/articles/${id}`);
      setSuccess("Artikel berhasil dihapus");
      await load();
    } catch (err) {
      setError("Gagal menghapus artikel");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setForm({
      title: "",
      slug: "",
      desc: "",
      category: "",
      date: "",
      content: "",
      img: "",
    });
    setFile(null);
    setEditId(null);
    setError("");
    setSuccess("");
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manajemen Artikel</h2>
      {error && <div className="bg-red-200 text-red-700 p-2 mb-2 rounded">{error}</div>}
      {success && <div className="bg-green-200 text-green-700 p-2 mb-2 rounded">{success}</div>}

      {/* Form Input */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <input className="w-full border p-2 mb-2" placeholder="Judul" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className="w-full border p-2 mb-2" placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <textarea className="w-full border p-2 mb-2" placeholder="Deskripsi" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
        <input className="w-full border p-2 mb-2" placeholder="Kategori" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input className="w-full border p-2 mb-2" placeholder="Tanggal" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input className="w-full border p-2 mb-2" placeholder="URL Gambar (opsional)" value={form.img} onChange={(e) => setForm({ ...form, img: e.target.value })} />
        <input type="file" className="w-full border p-2 mb-2" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />

        <Editor
          apiKey="489fzag6qiqhzdtvwte21vh1l2fevkcnj3r2bbraq2my9lp0"
          value={form.content}
          onEditorChange={(content) => setForm({ ...form, content })}
          init={{
            height: 300,
            menubar: false,
            plugins: 'link image code lists',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code',
          }}
        />

        <div className="mt-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded mr-2" onClick={save} disabled={loading}>
            {editId ? 'Update' : 'Tambah'} Artikel
          </button>
          {editId && (
            <button className="text-gray-600" onClick={cancelEdit}>Batal</button>
          )}
        </div>
      </div>

      {/* Daftar Artikel */}
      <div className="bg-white rounded shadow">
        <h3 className="text-lg font-semibold p-4 border-b">Daftar Artikel</h3>
        {articles.map((a) => (
          <div key={a._id} className="p-4 border-b">
            <h4 className="text-xl font-bold">{a.title}</h4>
            {a.img ? (
  <img
    src={a.img}
    alt={a.title}
    className="w-full max-w-xs h-32 object-cover rounded mb-2"
    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
  />
) : (
  <div className="text-gray-500">Tidak ada gambar</div>
)}

            <p className="text-sm mb-1"><strong>Deskripsi:</strong> {a.desc || "-"}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Kategori:</strong> {a.category || "-"} | <strong>Tanggal:</strong> {a.date || "-"}</p>
            <div className="text-sm text-gray-600 mb-2"><strong>Slug:</strong> {a.slug}</div>
            <div className="text-sm prose max-w-none" dangerouslySetInnerHTML={{ __html: a.content.substring(0, 200) + (a.content.length > 200 ? '...' : '') }} />
            <div className="flex gap-4 mt-2">
              <button onClick={() => edit(a)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => remove(a._id)} className="text-red-600 hover:underline">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
