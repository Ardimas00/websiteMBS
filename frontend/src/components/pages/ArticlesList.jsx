import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const CATEGORY_LIST = [
  "Semua",
  "PUPUK NPK",
  "PUPUK TUNGGAL",
  "PEMBENAH TANAH",
  "PUPUK MIKRO",
  "BIOLOGIS",
  "LAINNYA"
];

// Simulasi produk, data bisa diambil dari API jika dibutuhkan
const otherProducts = [
  // ... (produk tetap sama seperti sebelumnya)
];

const OtherProducts = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
    setLoading(false); // Tidak mengambil dari API untuk produk statis
  }, []);

  const filteredProducts = activeCategory === "Semua"
    ? otherProducts
    : otherProducts.filter(p => p.category === activeCategory);

  if (loading) {
    return (
      <section className="py-20 px-6 md:px-16 bg-gray-50 min-h-[80vh] flex items-center justify-center">
        <p>Memuat produk...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-6 md:px-16 bg-gray-50 min-h-[80vh] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-gray-50 min-h-[80vh] flex flex-col justify-center" data-aos="fade-up" data-aos-delay="0">
      <div className="max-w-7xl mx-auto px-4">
        <h2 data-aos="fade-up" data-aos-delay="0" className="text-3xl md:text-4xl font-bold text-center mb-4 text-black">Produk Lainnya</h2>
        <p className="text-gray-500 text-center mb-10" data-aos="fade-up" data-aos-delay="100">Lihat berbagai bahan untuk kebutuhan pertanian Anda</p>
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {CATEGORY_LIST.map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full border text-sm font-semibold transition-all duration-200 ${activeCategory === cat ? 'bg-[#10B981] text-white border-[#10B981]' : 'bg-white text-[#10B981] border-[#10B981] hover:bg-[#10B981] hover:text-white'}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            Tidak ada produk dalam kategori ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.map((p, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow p-6 flex flex-col h-full transition hover:shadow-xl"
                data-aos="fade-up"
                data-aos-delay={200 + idx * 100}
                data-aos-duration="1000"
                data-aos-easing="ease-out-cubic"
              >
                {p.image && (
                  <img src={p.image} alt={p.title} className="w-full max-h-48 object-contain rounded-xl shadow-sm mb-6 bg-white border border-gray-100 p-2" />
                )}
                <div className="font-semibold text-[20px] text-[#1F2937] mb-2">
                  <Link to={`/produk/${p.slug}`} className="hover:underline">
                    {p.title}
                  </Link>
                </div>
                <div className="text-[16px] text-[#6B7280] mb-2">{p.desc}</div>
                {p.application && (
                  <div className="text-[15px] text-[#374151] italic mb-5">{p.application}</div>
                )}
                <a href="#kontak" className="bg-[#10B981] hover:bg-green-700 text-white rounded-xl shadow px-6 py-2 font-medium mt-auto self-start transition">Hubungi Kami</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OtherProducts;