import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });

    const fetchArticle = async () => {
      try {
        // Coba ambil semua artikel dan cari berdasarkan slug atau ID
        const res = await axios.get("http://localhost:5000/articles");
        const foundArticle = res.data.find(a => a.slug === slug || a._id === slug);
        
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          setError("Artikel tidak ditemukan");
        }
      } catch (err) {
        console.error("Gagal memuat artikel:", err);
        setError("Gagal memuat artikel");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <section className="py-20 px-6 md:px-16 bg-[#F8F9FA] min-h-[80vh] flex items-center justify-center">
        <p>Loading artikel...</p>
      </section>
    );
  }

  if (error || !article) {
    return (
      <section className="py-20 px-6 md:px-16 bg-[#F8F9FA] min-h-[80vh] flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4">{error || "Artikel tidak ditemukan"}</p>
        <Link 
          to="/artikel" 
          className="bg-[#10B981] hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium shadow transition"
        >
          Kembali ke Daftar Artikel
        </Link>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 md:px-16 bg-[#F8F9FA] min-h-[80vh] flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full">
        <Link 
          to="/artikel" 
          className="inline-block mb-5 bg-[#10B981] hover:bg-green-700 text-white px-4 py-1.5 rounded-lg font-medium text-sm shadow transition"
        >
          &larr; Kembali ke Daftar Artikel
        </Link>
        
        {article.img && (
          <img 
            src={
              article.img.startsWith("http")
                ? article.img
                : `http://localhost:5000${article.img}`
            }
            alt={article.title} 
            className="w-full max-h-72 object-cover rounded-xl shadow mb-6 border border-gray-100"
            onError={(e) => {
              console.error('Error loading image:', article.img);
              e.target.style.display = 'none';
            }}
          />
        )}
        
        <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
          <span>{article.category || 'Umum'}</span>
          <span className="mx-1">•</span>
          <span>{article.date || new Date(article.createdAt).toLocaleDateString('id-ID')}</span>
        </div>
        
        <h1 className="font-extrabold text-2xl md:text-3xl mb-3 text-[#1F2937]">{article.title}</h1>
        <p className="text-[16px] text-[#6B7280] mb-6">{article.desc}</p>
        
        <div className="prose prose-green max-w-none mb-8 text-[#374151]">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </div>
    </section>
  );
};

export default ArticleDetail; 