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
    const payload = { ...form, img: imageUrl };
    await axios.post("http://localhost:5000/articles", payload);
    setForm({ title: "", slug: "", desc: "", category: "", date: "", content: "", img: "" });
    setFile(null);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manajemen Artikel</h2>

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
          plugins: 'link image code',
          toolbar: 'undo redo | bold italic | code'
        }}
      />

      <button onClick={save} className="bg-green-600 text-white px-4 py-2 rounded mt-4">Simpan</button>

      <h3 className="text-xl font-bold mt-10 mb-4">Daftar Artikel</h3>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Judul</th>
            <th className="border p-2">Gambar</th>
            <th className="border p-2">Kategori</th>
            <th className="border p-2">Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a) => (
            <tr key={a._id}>
              <td className="border p-2">{a.title}</td>
              <td className="border p-2 text-center">
                {a.img ? (
                  <img src={`http://localhost:5000${a.img}`} alt={a.title} className="h-16 object-contain mx-auto" />
                ) : '—'}
              </td>
              <td className="border p-2">{a.category || '-'}</td>
              <td className="border p-2">{a.date || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
