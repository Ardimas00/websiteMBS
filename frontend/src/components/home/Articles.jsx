import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });

    const fetchArticles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/articles");
        setArticles(res.data);
      } catch (err) {
        console.error("Gagal memuat artikel:", err);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section id="artikel" className="py-20 px-6 md:px-16 bg-[#F8F9FA] min-h-[80vh] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1F2937] text-center mb-8" data-aos="fade-up">
          Artikel & Panduan
        </h2>
        <p className="text-lg text-[#374151] text-center mb-10" data-aos="fade-up" data-aos-delay="100">
          Kumpulan artikel dan panduan seputar pertanian dan pemupukan
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((a, idx) => {
            const imageUrl =
              a.img?.startsWith("http")
                ? a.img
                : a.img
                ? `http://localhost:5000${a.img}`
                : null;

            return (
              <div
                key={a._id}
                className="bg-white rounded-2xl shadow p-6 flex flex-col h-full transition hover:shadow-xl"
                data-aos="fade-up"
                data-aos-delay={100 + idx * 100}
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={a.title}
                    className="w-full max-h-48 object-contain rounded-xl shadow-sm mb-6 bg-white border border-gray-100 p-2"
                    onError={(e) => {
                      console.error("Error loading image:", imageUrl);
                      e.target.style.display = "none";
                    }}
                  />
                )}

                <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                  <span>{a.category || "Umum"}</span>
                  <span className="mx-1">•</span>
                  <span>{a.date || "-"}</span>
                </div>

                <div className="font-semibold text-[20px] text-[#1F2937] mb-2 leading-snug">
                  <Link to={`/artikel/${a.slug}`}>{a.title}</Link>
                </div>

                <div className="text-[16px] text-[#6B7280] mb-5 line-clamp-2">{a.desc}</div>

                <Link
                  to={`/artikel/${a.slug || a._id}`}
                  className="text-[#10B981] hover:underline font-medium inline-flex items-center gap-1 mt-auto transition"
                >
                  Baca Selengkapnya
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 ml-1"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 12H6.75m7.5 0l-3-3m3 3l-3 3" />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Tombol ke daftar artikel lengkap */}
        <div className="mt-10 text-center">
          <Link
            to="/artikel"
            className="inline-block bg-[#10B981] hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition"
          >
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticlesList;
