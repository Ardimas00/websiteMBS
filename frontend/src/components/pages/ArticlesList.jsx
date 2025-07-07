import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });

    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/articles?q=${searchTerm}`);
        setArticles(res.data);
        setError(null);
      } catch (err) {
        console.error("Gagal memuat artikel:", err);
        setError("Gagal memuat artikel");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
  };

  if (loading) {
    return (
      <section className="py-20 md:py-28 px-6 md:px-16 bg-[#F8F9FA] min-h-[80vh] flex items-center justify-center">
        <p>Loading artikel...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 md:py-28 px-6 md:px-16 bg-[#F8F9FA] min-h-[80vh] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 px-6 md:px-16 bg-[#F8F9FA] min-h-[80vh] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1F2937] text-center mb-8" data-aos="fade-up">Artikel & Panduan</h2>
        <p className="text-lg text-[#374151] text-center mb-10" data-aos="fade-up" data-aos-delay="100">Kumpulan artikel dan panduan seputar pertanian dan pemupukan</p>

        <form onSubmit={handleSearch} className="flex justify-center mb-10 gap-2" data-aos="fade-up" data-aos-delay="150">
          <input
            type="text"
            placeholder="Cari judul artikel..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-full w-full max-w-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none"
          />
          <button type="submit" className="px-5 py-2 rounded-full bg-[#10B981] text-white font-semibold transition-all duration-200 hover:bg-green-700">
            Cari
          </button>
        </form>

        {articles.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Belum ada artikel tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {articles.map((a, idx) => (
              <div
                key={a._id}
                className="bg-white rounded-2xl shadow p-6 flex flex-col h-full transition hover:shadow-xl"
                data-aos="fade-up"
                data-aos-delay={100 + idx * 100}
              >
                {a.img && (
                  <img
                    src={
                      a.img.startsWith("http")
                        ? a.img
                        : a.img
                    }
                    alt={a.title}
                    className="w-full aspect-[4/3] object-cover rounded-xl shadow-sm mb-6"
                    onError={(e) => {
                      console.error('Error loading image:', a.img);
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                  <span>{a.category || 'Umum'}</span>
                  <span className="mx-1">•</span>
                  <span>{a.date || new Date(a.createdAt).toLocaleDateString('id-ID')}</span>
                </div>
                <div className="font-semibold text-[20px] text-[#1F2937] mb-2 leading-snug">
                  <Link to={`/artikel/${a.slug || a._id}`}>{a.title}</Link>
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 12H6.75m7.5 0l-3-3m3 3l-3 3"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticlesList;
