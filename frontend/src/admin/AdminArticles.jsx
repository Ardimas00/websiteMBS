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
      console.error("Error loading articles:", err);
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
      setSuccess("Gambar berhasil diupload!");
      return res.data.url;
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Gagal upload gambar");
      return null;
    }
  };

  const save = async () => {
    if (!form.title.trim() || !form.content.trim() || !form.slug.trim()) {
      setError("Judul, konten, dan slug wajib diisi");
      return;
    }

    try {
      setError("");
      setSuccess("");
      setLoading(true);

      let imageUrl = form.img;

      if (file) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          return;
        }
      }

      const payload = { ...form, img: imageUrl };

      if (editId) {
        await axios.put(`http://localhost:5000/articles/${editId}`, payload);
        setSuccess("Artikel berhasil diupdate!");
      } else {
        await axios.post("http://localhost:5000/articles", payload);
        setSuccess("Artikel berhasil ditambahkan!");
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
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error saving article:", err);
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
    if (!window.confirm("Apakah Anda yakin ingin menghapus artikel ini?")) return;
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/articles/${id}`);
      setSuccess("Artikel berhasil dihapus!");
      await load();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error deleting article:", err);
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

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {/* Form Tambah/Edit */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editId ? "Edit Artikel" : "Tambah Artikel Baru"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input className="w-full border p-2 rounded" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Judul Artikel *" />
          <input className="w-full border p-2 rounded" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Slug *" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input className="w-full border p-2 rounded" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Kategori" />
          <input className="w-full border p-2 rounded" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="Tanggal (contoh: 28 Juni 2025)" />
        </div>

        <textarea className="w-full border p-2 rounded mb-4" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Deskripsi Singkat" rows="3" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input className="w-full border p-2 rounded" value={form.img} onChange={(e) => setForm({ ...form, img: e.target.value })} placeholder="URL Gambar (opsional)" />
          <div>
            <input type="file" className="w-full border p-2 rounded" onChange={(e) => setFile(e.target.files[0])} accept="image/*" />
            {file && <p className="text-sm text-gray-600 mt-1">File dipilih: {file.name}</p>}
          </div>
        </div>

        <Editor
          apiKey="489fzag6qiqhzdtvwte21vh1l2fevkcnj3r2bbraq2my9lp0"
          value={form.content}
          onEditorChange={(content) => setForm({ ...form, content })}
          init={{
            height: 300,
            menubar: false,
            plugins: "link image code lists table",
            toolbar: "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code",
          }}
        />

        <div className="flex items-center space-x-4 mt-4">
          <button onClick={save} disabled={loading} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50">
            {loading ? "Menyimpan..." : editId ? "Update Artikel" : "Tambah Artikel"}
          </button>
          {editId && (
            <button onClick={cancelEdit} className="text-gray-600 hover:underline">
              Batal Edit
            </button>
          )}
        </div>
      </div>

      {/* Daftar Artikel */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Daftar Artikel</h3>
          {loading && <p className="text-sm text-gray-600">Loading...</p>}
        </div>

        {articles.length === 0 && !loading ? (
          <div className="p-8 text-center text-gray-500">Belum ada artikel tersedia.</div>
        ) : (
          <ul className="divide-y">
            {articles.map((a) => (
              <li key={a._id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-xl font-bold mb-2">{a.title}</div>
                    {a.img ? (
                      <a href={a.img.startsWith("http") ? a.img : `http://localhost:5000${a.img}`} target="_blank" rel="noopener noreferrer">
                        <img
                          src={a.img.startsWith("http") ? a.img : `http://localhost:5000${a.img}`}
                          alt={a.title}
                          className="w-full max-w-xs h-32 object-cover rounded mb-2"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/200x150?text=No+Image";
                          }}
                        />
                      </a>
                    ) : (
                      <div className="w-full max-w-xs h-32 bg-gray-100 flex items-center justify-center text-gray-400 text-sm rounded mb-2">
                        Tidak ada gambar
                      </div>
                    )}

                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Deskripsi:</strong> {a.desc || "Tidak ada deskripsi"}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      <strong>Kategori:</strong> {a.category || "Umum"} | <strong>Tanggal:</strong>{" "}
                      {a.date || new Date(a.createdAt).toLocaleDateString("id-ID")}
                    </p>
                    <div className="text-xs text-gray-500 mb-2">
                      <strong>Slug:</strong> {a.slug || a._id}
                    </div>
                    <div className="prose max-w-none text-sm" dangerouslySetInnerHTML={{ __html: a.content.substring(0, 200) + (a.content.length > 200 ? "..." : "") }} />
                  </div>
                  <div className="ml-4 space-y-2">
                    <button onClick={() => edit(a)} className="block w-full text-blue-600 hover:underline text-sm">
                      Edit
                    </button>
                    <button onClick={() => remove(a._id)} className="block w-full text-red-600 hover:underline text-sm">
                      Hapus
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
