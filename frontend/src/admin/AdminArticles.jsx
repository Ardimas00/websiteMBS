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

  const load = async () => {
    const res = await axios.get("http://localhost:5000/articles");
    setArticles(res.data);
  };

  const uploadImage = async () => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post("http://localhost:5000/upload", formData);
    return res.data.url; // => /uploads/namafile.jpg
  };

  const save = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      setError("Judul dan konten wajib diisi");
      return;
    }

    setError("");
    let imageUrl = form.img;

    if (file) {
      imageUrl = await uploadImage();
    }

    const payload = { ...form, img: imageUrl };

    if (editId) {
      await axios.put(`http://localhost:5000/articles/${editId}`, payload);
    } else {
      await axios.post("http://localhost:5000/articles", payload);
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
    load();
  };

  const edit = (a) => {
    setForm({
      title: a.title,
      slug: a.slug,
      desc: a.desc,
      category: a.category,
      date: a.date,
      content: a.content,
      img: a.img,
    });
    setEditId(a._id);
    setFile(null);
    setError("");
  };

  const remove = async (id) => {
    await axios.delete(`http://localhost:5000/articles/${id}`);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manajemen Artikel</h2>

      <div className="space-y-2 mb-6">
        {error && <p className="text-red-500">{error}</p>}

        <input
          className="w-full border p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Judul Artikel"
        />
        <input
          className="w-full border p-2 rounded"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          placeholder="Slug (contoh: cara-menanam-bayam)"
        />
        <input
          className="w-full border p-2 rounded"
          value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
          placeholder="Deskripsi Singkat"
        />
        <input
          className="w-full border p-2 rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          placeholder="Kategori"
        />
        <input
          className="w-full border p-2 rounded"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          placeholder="Tanggal (contoh: 28 Juni 2025)"
        />
        <input
          className="w-full border p-2 rounded"
          value={form.img}
          onChange={(e) => setForm({ ...form, img: e.target.value })}
          placeholder="URL Gambar (opsional)"
        />
        <input
          type="file"
          className="w-full border p-2 rounded"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <Editor
          apiKey="489fzag6qiqhzdtvwte21vh1l2fevkcnj3r2bbraq2my9lp0"
          value={form.content}
          onEditorChange={(content) => setForm({ ...form, content })}
          init={{
            height: 300,
            menubar: false,
            plugins: "link image code lists table",
            toolbar:
              "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code",
          }}
        />

        <div className="flex items-center space-x-4 mt-2">
          <button
            onClick={save}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editId ? "Update Artikel" : "Tambah Artikel"}
          </button>
          {editId && (
            <button
              className="text-gray-600 hover:underline"
              onClick={() => {
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
              }}
            >
              Batal Edit
            </button>
          )}
        </div>
      </div>

      {/* Daftar Artikel */}
      <ul className="space-y-4">
        {articles.map((a) => (
          <li key={a._id} className="border p-4 rounded shadow bg-white">
            <div className="text-xl font-bold">{a.title}</div>
            {a.img && (
              <img
                src={
                  a.img.startsWith("http")
                    ? a.img
                    : `http://localhost:5000${a.img}`
                }
                alt={a.title}
                className="w-full h-48 object-cover my-2 rounded"
              />
            )}
            <p className="text-gray-700 text-sm">
              <strong>Deskripsi:</strong> {a.desc}
            </p>
            <p className="text-xs text-gray-500">
              <strong>Kategori:</strong> {a.category} |{" "}
              <strong>Tanggal:</strong> {a.date}
            </p>
            <div
              className="prose max-w-none text-sm my-2"
              dangerouslySetInnerHTML={{ __html: a.content }}
            />
            <div className="space-x-2">
              <button
                onClick={() => edit(a)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => remove(a._id)}
                className="text-red-600 hover:underline"
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
